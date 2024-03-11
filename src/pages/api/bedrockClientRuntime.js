import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
};

const client = new BedrockRuntimeClient(config);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Extract the query from the request body
            const { query } = req.body;

            // Adjust the request to use the query as the "prompt"
            const request = {
                "prompt": query,
            };

            const input = {
                body: JSON.stringify(request),
                contentType: "application/json",
                accept: "application/json",
                modelId: "mistral.mixtral-8x7b-instruct-v0:1"
            };

            const command = new InvokeModelCommand(input);

            const response = await client.send(command);
            const uint8Array = response.body;

            // Convert Uint8Array to string
            const decoder = new TextDecoder('utf-8');
            const jsonString = decoder.decode(uint8Array);

            // Parse and return the response
            const responseData = JSON.parse(jsonString);
            res.status(200).json(responseData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching response from Bedrock' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
