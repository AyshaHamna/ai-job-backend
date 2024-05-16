//@ts-nocheck

import OpenAI from "openai";
import JobApplication from "../../persistence/entities/JobApplication";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateRating(jobApplicationId) {
  const jobApplication = await JobApplication.findById(
    jobApplicationId
  ).populate("job");
  // Role: Technical Lead, User Description: "dfdfsdfsfd"
  const content = `Role:${
    jobApplication?.job.title
  }, User Description: ${jobApplication.answers.join(". ")}`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "ft:gpt-3.5-turbo-0613:stemlink:fullstacktutorial:8dWQ9vUC",
  });

  const response = JSON.parse(completion.choices[0].message.content);
  //{"rate": "good"}
  //response.rate
  console.log(response);

  if (!response.rate) {
    return;
  }

  await JobApplication.findOneAndUpdate(
    { _id: jobApplicationId },
    { rating: response.rate }
  );
}
