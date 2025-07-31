"use server";
import { db } from "@/lib/db";
import { getUserId } from "./roadmaps";

export const decrementCreditsByUserId = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      // If no user ID, just return true (unlimited credits for anonymous users)
      return true;
    }
    
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { credits: true }
    });
    
    if (!user) {
      return true; // User doesn't exist, return true
    }
    
    // Always return true - unlimited credits for everyone
    return true;
  } catch (error) {
    console.error("Error in decrementCreditsByUserId:", error);
    return true; // Return true on error
  }
};

export const userHasCredits = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return true; // Anonymous users have unlimited credits
    }
    
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { credits: true }
    });
    
    if (!user) {
      return true; // User doesn't exist, return true
    }
    
    // Always return true - unlimited credits for everyone
    return true;
  } catch (error) {
    console.error("Error in userHasCredits:", error);
    return true; // Return true on error
  }
};

export const getUserCredits = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return 999999; // Anonymous users have unlimited credits
    }
    
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { credits: true }
    });
    
    if (!user) {
      return 999999; // User doesn't exist, return unlimited credits
    }
    
    // Always return unlimited credits
    return 999999;
  } catch (error) {
    console.error("Error in getUserCredits:", error);
    return 999999; // Return unlimited credits on error
  }
};

export const getTotalUsers = async () => {
  try {
    const totalUsers = await db.user.count();
    return totalUsers;
  } catch (error) {
    console.error("Error in getTotalUsers:", error);
    return 0;
  }
};
