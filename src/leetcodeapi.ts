import axios from "axios";

export type LeetCodeStats = {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  contestRating: number;
};

export const getLeetCodeStats = async (username: string) => {
  try {
    const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    throw error;
  }
};
