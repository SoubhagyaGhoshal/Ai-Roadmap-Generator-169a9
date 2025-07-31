"use server";
import { Node } from "@/lib/shared/types/common";
import { Visibility } from "@prisma/client";
import { db } from "@/lib/db";

export const getUserId = async () => {
  // Return null for anonymous users - this will be handled by the calling functions
  return null;
};

export const getRoadmapsByUserId = async () => {
  try {
    // Return empty array for anonymous users
    return [] as any[];
  } catch (error) {
    console.error("Error in getRoadmapsByUserId:", error);
    return [] as any[];
  }
};

export const getSavedRoadmapsByUserId = async () => {
  try {
    // Return empty array for anonymous users
    return [] as any[];
  } catch (error) {
    console.error("Error in getSavedRoadmapsByUserId:", error);
    return [] as any[];
  }
};

export const getRoadmapById = async (id: string) => {
  try {
    if (!id) return null;
    
    const roadmap = await db.roadmap.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            credits: true,
          },
        },
      },
    });
    
    return roadmap;
  } catch (error) {
    console.error("Error in getRoadmapById:", error);
    return null;
  }
};

export const saveRoadmap = async (title: string, content: Node[]) => {
  try {
    // Create a temporary roadmap without user association
    const roadmap = await db.roadmap.create({
      data: {
        title,
        content: JSON.stringify(content),
        userId: "anonymous-user", // Use a default user ID
        visibility: "PUBLIC",
        // Don't include views and searchCount as they might not exist in the database
      },
    });
    
    return {
      status: "success",
      data: roadmap,
    };
  } catch (error) {
    console.error("Error in saveRoadmap:", error);
    return {
      status: "error",
      error,
    };
  }
};

export const incrementRoadmapSearchCount = async (roadmapId: string) => {
  try {
    // This function is now a no-op since we removed searchCount from the schema
    // We'll just log that it was called but not actually increment anything
    console.log(`Search count increment requested for roadmap ${roadmapId} (no-op)`);
  } catch (error) {
    console.error("Error in incrementRoadmapSearchCount:", error);
    // Don't throw error, just log it
  }
};

export const changeRoadmapVisibility = async (
  roadmapId: string,
  visibility: Visibility
) => {
  try {
    await db.roadmap.update({
      where: { id: roadmapId },
      data: { visibility },
    });
  } catch (error) {
    console.error("Error in changeRoadmapVisibility:", error);
  }
};

export const isRoadmapGeneratedByUser = async (roadmapId: string) => {
  try {
    const roadmap = await db.roadmap.findUnique({
      where: { id: roadmapId },
      select: { userId: true },
    });
    
    return {
      isGeneratedByUser: false,
      isSavedByUser: false,
      isAuthor: false,
    };
  } catch (error) {
    console.error("Error in isRoadmapGeneratedByUser:", error);
    return {
      isGeneratedByUser: false,
      isSavedByUser: false,
      isAuthor: false,
    };
  }
};

export const getPublicRoadmaps = async () => {
  try {
    const roadmaps = await db.roadmap.findMany({
      where: { visibility: "PUBLIC" },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });
    
    return roadmaps;
  } catch (error) {
    console.error("Error in getPublicRoadmaps:", error);
    return [] as any[];
  }
};

type PaginatedPublicRoadmap = {
  page: number;
  pageSize: number;
};

export const getPaginatedPublicRoadmaps = async ({
  page,
  pageSize,
}: PaginatedPublicRoadmap) => {
  try {
    const skip = (page - 1) * pageSize;
    
    const [roadmaps, totalCount] = await Promise.all([
      db.roadmap.findMany({
        where: { visibility: "PUBLIC" },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      }),
      db.roadmap.count({
        where: { visibility: "PUBLIC" },
      }),
    ]);
    
    return {
      roadmaps,
      totalCount,
    };
  } catch (error) {
    console.error("Error in getPaginatedPublicRoadmaps:", error);
    return {
      roadmaps: [] as any[],
      totalCount: 0,
    };
  }
};

export const checkIfTitleInUsersRoadmaps = async (title: string) => {
  try {
    const roadmap = await db.roadmap.findFirst({
      where: { title },
      select: { id: true },
    });
    
    return {
      state: !!roadmap,
      id: roadmap?.id || "",
    };
  } catch (error) {
    console.error("Error in checkIfTitleInUsersRoadmaps:", error);
    return {
      state: false,
      id: "",
    };
  }
};

export const incrementUserCredits = async () => {
  // Do nothing for now - unlimited credits
};

export const deleteRoadmapById = async (
  id: string
): Promise<{ status: string; message?: string }> => {
  try {
    await db.roadmap.delete({
      where: { id },
    });
    
    return {
      status: "success",
      message: "Roadmap deleted successfully",
    };
  } catch (error) {
    console.error("Error in deleteRoadmapById:", error);
    return {
      status: "error",
      message: "Failed to delete roadmap",
    };
  }
};

export const deleteSavedRoadmapById = async (
  id: string
): Promise<{ status: string; message?: string }> => {
  try {
    await db.savedRoadmap.delete({
      where: { id },
    });
    
    return {
      status: "success",
      message: "Saved roadmap deleted successfully",
    };
  } catch (error) {
    console.error("Error in deleteSavedRoadmapById:", error);
    return {
      status: "error",
      message: "Failed to delete saved roadmap",
    };
  }
};

export const increaseViewsByRoadmapId = async (id: string) => {
  try {
    // This function is now a no-op since we removed views from the schema
    // We'll just log that it was called but not actually increment anything
    console.log(`Views increment requested for roadmap ${id} (no-op)`);
  } catch (error) {
    console.error("Error in increaseViewsByRoadmapId:", error);
  }
};

export const saveToUserDashboard = async (roadmapId: string) => {
  try {
    const roadmap = await db.roadmap.findUnique({
      where: { id: roadmapId },
      select: { title: true },
    });
    
    if (roadmap) {
      await db.savedRoadmap.create({
        data: {
          title: roadmap.title,
          roadmapId,
          userId: "anonymous-user",
        },
      });
      
      return {
        status: "success",
        message: "Roadmap saved successfully",
      };
    } else {
      return {
        status: "error",
        message: "Roadmap not found",
      };
    }
  } catch (error) {
    console.error("Error in saveToUserDashboard:", error);
    return {
      status: "error",
      message: "Failed to save roadmap",
    };
  }
};

export const saveNodeDetails = async (
  roadmapId: string,
  nodeName: string,
  content: string,
  youtubeVideoIds: string[]
) => {
  try {
    await db.drawerDetail.upsert({
      where: { nodeName },
      update: {
        details: content,
        youtubeVideoIds,
        roadmapId,
      },
      create: {
        details: content,
        youtubeVideoIds,
        nodeName,
        roadmapId,
      },
    });
  } catch (error) {
    console.error("Error in saveNodeDetails:", error);
  }
};

export const findSavedNodeDetails = async (
  roadmapId: string,
  nodeName: string
) => {
  try {
    const details = await db.drawerDetail.findUnique({
      where: { nodeName },
    });
    
    return details;
  } catch (error) {
    console.error("Error in findSavedNodeDetails:", error);
    return null;
  }
};

export const getTotalRoadmapsGenerated = async () => {
  try {
    const count = await db.roadmap.count();
    return count;
  } catch (error) {
    console.error("Error in getTotalRoadmapsGenerated:", error);
    return 0; // Return 0 if there's an error
  }
};
