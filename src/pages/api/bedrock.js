import { BedrockClient, ListFoundationModelsCommand } from "@aws-sdk/client-bedrock";

// Assuming AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY are set in your .env.local file
const config = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

// Initialize the Amazon Bedrock client
const client = new BedrockClient(config);

async function listFoundationModels() {
  const input = {
    // Adjust these values based on your needs. They are placeholders and may not match actual API parameters.
    };

  const command = new ListFoundationModelsCommand(input);

  try {
    const response = await client.send(command);
    console.log(response); // Print the response to the terminal
    return response; // Return the response for further use
  } catch (error) {
    console.error(error);
    return error; // Return error for error handling
  }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const response = await listFoundationModels();
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching foundation models' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }