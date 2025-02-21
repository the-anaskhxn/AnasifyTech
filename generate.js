import { Configuration, OpenAIApi } from "openai";
import fs from "fs";

// OpenAI API Key (Get from https://platform.openai.com/)
const API_KEY = "your_openai_api_key";

const openai = new OpenAIApi(new Configuration({ apiKey: API_KEY }));

// Function to generate an article
async function generateArticle(topic) {
  const prompt = `Write a high-quality SEO blog post about ${topic}. Include an introduction, key points, and a conclusion.`;
  
  const response = await openai.createCompletion({
    model: "gpt-4",
    prompt: prompt,
    max_tokens: 1000,
  });

  return response.data.choices[0].text.trim();
}

// Function to save the article to the blog
async function saveArticle() {
  const trendingTopics = ["AI in 2025", "Best AI tools", "Tech trends"]; // Replace with Google Trends API

  for (let topic of trendingTopics) {
    const article = await generateArticle(topic);
    const fileName = `content/${topic.replace(/ /g, "-").toLowerCase()}.md`;

    fs.writeFileSync(fileName, `# ${topic}\n\n${article}`);

    console.log(`✅ Article saved: ${fileName}`);
  }
}

saveArticle();
