import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    console.log("getting user posts");
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.log("error : ", e);
    return new Response("Failed to fetch user posts", { status: 500 });
  }
};
