import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";
import  fs  from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getData = new tool({
  name: "Data Fetching Tool",
  description: "Use this tool to get data from an API",
  parameters: z.object({}),
  execute: async ({}) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1" // Replace with your own url (Thanks JSONPlaceholder!)
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

const agent = new Agent({
  name: "Agent",
  instructions:
    "You get data from the other agent and if the user requests you explain the data to the user",
});

const agent2 = new Agent({
  name: "Agent2",
  instructions:
    'You use the getData tool to get data from an API or the readFile tool to read the file in the directory. If the data you receive is a JSON, format all elements e.g. "value": 1 you return value is 1, then give it to the other agent agent. If it is just a plain text document, give it directly to the other agent agent',
  tools: [getData, readFile],
  handoffs: [agent],
});

const result = await run(agent2, "Read the file using the readFile tool and make a TLDR of it");

console.log(result.finalOutput);
