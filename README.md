<h1>DataAgent</h1>

  This project is a Node.js application that demonstrates a multi-agent AI system using the `@openai/agents`
  library. It consists of two agents that work together to fetch and process data.

  <h2>Overview</h2>

  The system is composed of two agents:

   * Agent2: This agent is responsible for data retrieval. It can either fetch data from a public API or read a
     local text file. It then passes the retrieved data to the other agent.
   * Agent: This agent receives the data from Agent2 and can provide explanations or summaries to the user.

  <h2>Features</h2>

   * Multi-agent interaction: Demonstrates how two AI agents can collaborate to complete a task.
   * Tool usage: Shows how to equip agents with tools to interact with external resources like APIs and the
     file system.
   * Data fetching: Includes a tool to fetch data from a remote API.
   * File reading: Includes a tool to read data from a local file.

  <h3>Getting Started</h3>

  <h4>Prerequisites</h4>

   * Node.js
   * npm (or your favorite package manager)

  <h4>Installation</h4>

Clone the repository:

    git clone git@github.com:geospachos/DataAgent.git

Install the dependencies:

    npm install

   To run the application, execute the following command:

     node main.js

   This will trigger a predefined interaction where Agent2 reads a file and Agent1 summarizes it.

  <h3>Ways to Use the Agent</h3>

  You can interact with the agents and customize their behavior by modifying the main.js file. The primary
  way to interact with the agent is by changing the prompt passed to the run function.

  Interacting with the Agent

Open the main.js file and locate the following line:

    const result = await run(agent2, "Read the file using the readFile tool and make a TLDR of it");

You can change the string "Read the file using the readFile tool and make a TLDR of it" to instruct the
  agent to perform different tasks.

  Example Prompts:

* To fetch data from the API and have it explained:

        const result = await run(DataFetchingAgent, "Use the getData tool to fetch data and explain it to me.");
* To read the file and get a simple confirmation:

        const result = await run(DataFetchingAgent, "Read the file using the readFile tool and make a TLDR with it.");

Modifying Agent Capabilities

  You can also modify the agents' tools and instructions to change their core capabilities.

   * Change the API endpoint: In the getData tool, replace the URL in the fetch call with your desired API
     endpoint.
   * Change the file path: In the readFile tool, modify the file path to point to a different file.
   * Modify agent instructions: You can change the instructions property of each agent to alter their behavior
     and purpose.
   * Add new tools: You can create new tools and add them to the agents to extend their capabilities.