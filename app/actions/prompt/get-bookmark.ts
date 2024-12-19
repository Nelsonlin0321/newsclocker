"use server";
import prisma from "@/prisma/client";
// import { auth } from "@clerk/nextjs/server";

// Simple in-memory cache with timestamps
const cache: { [key: string]: { value: boolean; timestamp: number } } = {};
const MAX_CACHE_SIZE = 512; // Set your desired maximum cache size
const SECOND = 15;

// Function to evict the oldest entry if the cache exceeds the limit
const evictCacheIfNeeded = () => {
  const keys = Object.keys(cache);
  if (keys.length >= MAX_CACHE_SIZE) {
    // Remove the oldest entry (first key in the object)
    delete cache[keys[0]];
  }
};

export const getBookmark = async (
  promptId: string,
  userId: string | null | undefined
) => {
  try {
    if (!userId) {
      return false;
    }
    // // const { userId } = await auth();
    // // if (!userId) {
    // //   return false;
    // // }
    // // Check if the result is already cached

    // const cacheKey = `bookmark_${userId}_${promptId}`; // Combined cache key
    // const cachedEntry = cache[cacheKey];

    // // Check if the cached entry exists and is still valid
    // if (cachedEntry && Date.now() - cachedEntry.timestamp < SECOND * 1000) {
    //   return cachedEntry.value; // Return cached value if valid
    // }

    // Fetch from the database if not cached or if revalidation is needed
    const favoritePrompt = await prisma.favoritePrompt.findFirst({
      where: { userId, promptId },
    });

    const result = !!favoritePrompt; // Convert to boolean
    // Store the result in cache with the current timestamp
    // cache[cacheKey] = { value: result, timestamp: Date.now() };

    // Evict cache if needed
    // evictCacheIfNeeded();

    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};
