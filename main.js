import { Agent, run, tool } from '@openai/agents';
import { z } from 'zod'

const getData = new tool({
    name: 'Data Fetching Tool',
    description: 'Use this tool to get data from an API',
    parameters: z.object({}),
    execute: async ({}) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1'); // Replace with your own url to get data from (Thanks JSONPlaceholder!)
            const result = await response.json();
            return result;
        } catch (error) {
            return `There was a problem getting the data`
        }
    }
});

const agent = new Agent({
    name: 'Agent',
    instructions:
        'You get data from the other agent and give it to the user as it is'
});

const agent2 = new Agent({
    name: 'Agent2',
    instructions:
        'You use the getData tool to get data from an API, format all elements inside the JSON e.g. "value": 1 you return value is 1, then give it to the other agent agent ',
    tools: [getData],
    handoffs: [agent],
});

const result = await run(agent2, 'Get data and explain it to me');

console.log(result.finalOutput);


