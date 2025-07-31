import {
  incrementRoadmapSearchCount,
  incrementUserCredits,
  saveRoadmap,
} from "@/actions/roadmaps";
import { decrementCreditsByUserId } from "@/actions/users";
import { Node } from "@/lib/shared/types/common";
import { db } from "@/lib/db";
import { SanitiseJSON, capitalize } from "@/lib/utils";
import { ChatCohere } from "@langchain/cohere";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const apiKey = req.nextUrl.searchParams.get("apiKey");

  try {
    const body = await req.json();
    const query = body.query;

    if (!query) {
      return NextResponse.json(
        { status: false, message: "Please send query." },
        { status: 400 },
      );
    }

    if (!apiKey && !process.env.COHERE_API_KEY) {
      return NextResponse.json(
        {
          status: false,
          message:
            "API key not found. Please provide your api key to generate a roadmap.",
        },
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

    const model = new ChatCohere({
      apiKey: apiKey || process.env.COHERE_API_KEY,
      model: "command",
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "ai",
        `You are a helpful AI assistant that can generate career/syllabus roadmaps. You can arrange it in a way so that the order of the chapters is always from beginner to advanced. Always generate a minimum of 4 modules inside a chapter. IMPORTANT: REFRAIN FROM ANSWERING ANY NSFW/DESTRUCTIVE/PROFANITY QUERY. IMPORTANT: Use the exact query term provided by the user - do not substitute or interpret it differently.
        `,
      ],
      ["human", "{input}"],
    ]);

    const chain = prompt.pipe(model);
    const response = await chain.invoke({
      input: `Generate a roadmap in JSON format related to the title: ${query} which has the JSON structure: {query: ${query}, chapters: {chapterName: string[]}}. Use "${query}" exactly as provided - do not change or interpret the query term.`,
    });

    let json: { query: string; chapters: { [key: string]: string[] } } | null =
      null;

    try {
      json = JSON.parse(SanitiseJSON(String(response?.content)));
      if (!apiKey) {
        try {
          const creditsRemaining = await decrementCreditsByUserId();
          if (!creditsRemaining) {
            return NextResponse.json(
              {
                status: true,
                message: "No credits remaining ",
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

      if (!json) {
        return NextResponse.json(
          {
            status: false,
            message:
              "An unexpected error occurred while generating roadmap. Please try again or use a different keyword/query.",
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

      const tree: Node[] = [
        {
          name: capitalize(json.query),
          children: Object.keys(json.chapters).map((sectionName) => ({
            name: sectionName,
            children: json?.chapters?.[sectionName]?.map(
              (moduleName: string) => ({
                name: moduleName,
              }),
            ),
          })),
        },
      ];
      const { data } = await saveRoadmap(query, tree);
      return NextResponse.json(
        { status: true, text: json, tree: tree, roadmapId: data?.id },
        { status: 200 },
      );
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        {
          status: false,
          message:
            "An unexpected error occurred while generating roadmap. Please try again or use a different keyword/query.",
        },
        { status: 500 },
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
      { status: 400 },
    );
  }
};
