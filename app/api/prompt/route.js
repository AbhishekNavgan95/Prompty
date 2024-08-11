import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    console.log("fetching all posts")
    await connectToDB();

    const prompts = await Prompt.find().populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (e) {
    console.log("error : ", e);
    return new Response("Failed to fetch all propmts", {
      status: 500,
    });
  }
};
