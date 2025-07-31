import {
  incrementRoadmapSearchCount,
  incrementUserCredits,
  saveRoadmap,
} from "@/actions/roadmaps";
import { decrementCreditsByUserId } from "@/actions/users";
import { Node } from "@/lib/shared/types/common";
import { db } from "@/lib/db";
import { JSONType } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export const POST = async (req: NextRequest) => {
  try {
    const apiKey = req.nextUrl.searchParams.get("apiKey");
    const body = await req.json();
    const query = body.query;

    // Check if we have an API key (either from user or environment)
    const groqApiKey = apiKey || process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      return NextResponse.json(
        { 
          status: false, 
          message: "No API key provided. Please add GROQ_API_KEY environment variable to your Vercel deployment or provide your own API key. You can get a free API key from https://console.groq.com/" 
        },
        { status: 400 },
      );
    }

    const openai = new OpenAI({
      apiKey: groqApiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    if (!query) {
      return NextResponse.json(
        { status: false, message: "Please send query." },
        { status: 400 },
      );
    }

    // Use exact matching instead of substring matching to prevent "java" from matching "javascript"
    const normalizedQuery = query.trim().toLowerCase();

    const alreadyExists = await db.roadmap.findFirst({
      where: {
        title: {
          mode: "insensitive",
          equals: normalizedQuery,
        },
      },
    });

    if (alreadyExists) {
      await incrementRoadmapSearchCount(alreadyExists.id);
      const tree = JSON.parse(alreadyExists.content);
      return NextResponse.json(
        { status: true, tree, roadmapId: alreadyExists.id },
        { status: 200 },
      );
    }

    console.log("Generating roadmap for query:", query);

    const text = await openai.chat.completions.create({
      model: "llama3-70b-8192",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant that generates learning roadmaps. Create structured learning paths from beginner to advanced. Always provide at least 4 modules per chapter. Include Wikipedia links when possible. You must return ONLY valid JSON, no additional text or explanations. IMPORTANT: Use the exact query term provided by the user - do not substitute or interpret it differently.",
        },
        {
          role: "user",
          content: `Generate a learning roadmap for "${query}" in this exact JSON format. Return ONLY the JSON, no other text. Use "${query}" exactly as provided - do not change or interpret the query term:

{
  "query": "${query}",
  "chapters": {
    "Fundamentals": [
      {
        "moduleName": "Introduction to ${query}",
        "moduleDescription": "Basic concepts and overview",
        "link": "https://en.wikipedia.org/wiki/${query.replace(/\s+/g, '_')}"
      }
    ],
    "Intermediate": [
      {
        "moduleName": "Advanced ${query} Concepts",
        "moduleDescription": "Deeper understanding and practical applications",
        "link": "https://en.wikipedia.org/wiki/${query.replace(/\s+/g, '_')}_programming"
      }
    ]
  }
}

Generate 3-5 chapters with 4-6 modules each. Return ONLY the JSON object. Use "${query}" exactly as provided.`,
        },
      ],
    });

    console.log("Groq response:", text?.choices?.[0]?.message?.content);

    // Only check credits if user didn't provide their own API key
    if (!apiKey) {
      try {
        const creditsRemaining = await decrementCreditsByUserId();
        if (!creditsRemaining) {
          return NextResponse.json(
            {
              status: true,
              message: "No credits remaining",
            },
            { status: 400 },
          );
        }
      } catch (e) {
        await incrementUserCredits();
        console.log(e);
        return NextResponse.json(
          {
            status: false,
            message: "An error occurred while managing credits.",
          },
          { status: 500 },
        );
      }
    }

    let json: JSONType | null = null;

    try {
      const responseContent = text?.choices?.[0]?.message?.content;
      console.log("Response content:", responseContent);
      
      if (!responseContent) {
        return NextResponse.json(
          {
            status: false,
            message: "No response content from AI model",
          },
          { status: 500 },
        );
      }

      // Try to extract JSON from the response
      let jsonString = responseContent.trim();
      
      // If the response contains markdown code blocks, extract the JSON
      if (jsonString.includes("```json")) {
        jsonString = jsonString.split("```json")[1]?.split("```")[0] || jsonString;
      } else if (jsonString.includes("```")) {
        jsonString = jsonString.split("```")[1]?.split("```")[0] || jsonString;
      }
      
      jsonString = jsonString.trim();
      
      json = JSON.parse(jsonString);
      console.log("Parsed JSON:", json);
      
      if (!json) {
        return NextResponse.json(
          {
            status: false,
            message: "Invalid JSON response from AI model",
          },
          { status: 500 },
        );
      }
      
      // Verify that the query in the response matches the original query
      if (json.query !== query) {
        console.log(`Query mismatch: original="${query}", response="${json.query}"`);
        // Force the correct query
        json.query = query;
      }
      
      if (!json.chapters) {
        return NextResponse.json(
          {
            status: false,
            message: "Invalid response format from AI model",
          },
          { status: 500 },
        );
      }

      const tree: Node[] = [
        {
          name: capitalize(json.query),
          children: Object.keys(json.chapters).map((sectionName) => ({
            name: sectionName,
            children: json?.chapters?.[sectionName]?.map(
              ({ moduleName, link, moduleDescription }) => ({
                name: moduleName,
                moduleDescription,
                link,
              }),
            ),
          })),
        },
      ];

      console.log("Generated tree:", tree);
      
      const { data } = await saveRoadmap(query, tree);
      return NextResponse.json(
        { status: true, text: json, tree, roadmapId: data?.id },
        { status: 200 },
      );
    } catch (e) {
      console.error("Error parsing response:", e);
      return NextResponse.json(
        {
          status: false,
          message: "An unexpected error occurred while generating roadmap. Please try again or use a different keyword/query.",
          error: e instanceof Error ? e.message : "Unknown error",
        },
        { status: 500 },
      );
    }
  } catch (e) {
    console.error("Error in roadmap generation:", e);
    return NextResponse.json(
      {
        status: false,
        message:
          "An unexpected error occurred while generating roadmap. Please try again or use a different keyword/query.",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 400 },
    );
  }
};
