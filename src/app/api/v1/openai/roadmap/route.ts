import { Node } from "@/lib/shared/types/common";
import { JSONType } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

export const POST = async (req: NextRequest) => {
  try {
    const apiKey = req.nextUrl.searchParams.get("apiKey");
    const body = await req.json();
    const query = body.query;

    const openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY || "sk-demo-key",
    });

    if (!query) {
      return NextResponse.json(
        { status: false, message: "Please send query." },
        { status: 400 }
      );
    }

    const text = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      temperature: 1,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant that can generate career/syllabus roadmap. You can arrange it in a way so that the order of the chapters is always from beginner to advanced. Always generate a minimum of 4 modules inside a chapter, link to wikipedia if possible. You must return ONLY valid JSON, no additional text or explanations. PLEASE REFRAIN FROM GENERATING ANY OBSCENE CONTENT AS THIS PLATFORM IS A LEARNING PLATFORM. IMPORTANT: Use the exact query term provided by the user - do not substitute or interpret it differently.",
        },
        {
          role: "user",
          content: `Generate a roadmap in JSON format related to the title: ${query}. Return ONLY the JSON, no other text. Use "${query}" exactly as provided - do not change or interpret the query term. Use this exact structure:

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
      response_format: { type: "json_object" },
    });

    let json: JSONType | null = null;

    try {
      json = JSON.parse(text?.choices?.[0]?.message?.content || "");
      if (!json) {
        return NextResponse.json(
          {
            status: false,
            message:
              "An unexpected error occurred while generating roadmap. Please try again or use a different keyword/query.",
          },
          { status: 500 }
        );
      }
      
      // Verify that the query in the response matches the original query
      if (json.query !== query) {
        console.log(`Query mismatch: original="${query}", response="${json.query}"`);
        // Force the correct query
        json.query = query;
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
              })
            ),
          })),
        },
      ];
      
      return NextResponse.json(
        { status: true, text: json, tree, roadmapId: "temp-" + Date.now() },
        { status: 200 }
      );
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        {
          status: false,
          message:
            "An unexpected error occurred while generating roadmap. Please try again or use a different keyword/query.",
        },
        { status: 500 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        status: false,
        message:
          "An unexpected error occurred while generating roadmap. Please try again or use a different keyword/query.",
      },
      { status: 400 }
    );
  }
};
