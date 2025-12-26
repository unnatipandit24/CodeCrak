// src/api/codeforcesApi.ts
export type CodeforcesStats = {
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  solvedProblems: number; 
};

export const getCodeforcesStats = async (username: string): Promise<CodeforcesStats | null> => {
  try {
    // Fetch user info
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${username}`
    );
    const data = await res.json();

    if (data.status !== "OK") return null;

    const user = data.result[0];

   
    return {
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unrated",
      maxRank: user.maxRank || "unrated",
      solvedProblems: 0, 
    };
  } catch (error) {
    console.error("Codeforces API error:", error);
    return null;
  }
};
