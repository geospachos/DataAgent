import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";
import  fs  from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getData = new tool({
  name: "Data Fetching Tool",
  description: "Use this tool to get data from an Endpoint, like an API or a Backend. This can be anything that returns a JSON file.",
  parameters: z.object({}),
  execute: async ({}) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1" // Replace with your own url
      ); 
      const result = await response.json();
      return result;
    } catch (error) {
      return `There was a problem fetching the data`;
    }
  },
});

const readFile = new tool({
    name: 'File Reading Tool',
    description: 'Use this tool to read the hardcoded file /files/bedtime_story.txt',
    parameters: z.object({}),
    execute: async () => {
        try {
            const fullPath = path.join(__dirname, '/files/bedtime_story.txt');
            const data = fs.readFileSync(fullPath, 'utf8');
            return data;
        } catch (err) {
            return `There was an error reading the file: ${err.message}`;
        }
    },
});

const Summarizer = new Agent({
  name: "Summarizer",
  model: "gpt-5-nano-2025-08-07",
  instructions:
    "You get data from the other agent and if the user requests you explain the data to the user",
});

const DataFetchingAgent = new Agent({
  name: "DataFetchingAgent",
  model: "gpt-5-nano-2025-08-07",
  instructions:
    'You use the getData tool to get data from an API or the readFile tool to read the file in the directory. If the data you receive is a JSON, format all elements e.g. "value": 1 you return value is 1, then give it to the other agent agent. If it is just a plain text document, give it directly to the other agent agent',
  tools: [getData, readFile],
  handoffs: [Summarizer],
});

const result = await run(DataFetchingAgent, "Fetch Data and explain it to me"); // Change with what you want the Agent to do

console.log(result.finalOutput);