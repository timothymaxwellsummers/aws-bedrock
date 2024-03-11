import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime"; // ES Modules import

// Assuming AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY are set in your .env.local file
const config = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
};

// Initialize the Amazon Bedrock client
const client = new BedrockRuntimeClient(config);

const request = {
    "prompt": "Say hello to me using both english and german!",
}

async function invokeModelCommand() {
    const input = {
        // Adjust these values based on your needs. They are placeholders and may not match actual API parameters.
        body: JSON.stringify(request),
        contentType: "application/json",
        accept: "application/json",
        modelId: "mistral.mixtral-8x7b-instruct-v0:1"
    };

    const command = new InvokeModelCommand(input);

    try {
        const response = await client.send(command);
        console.log(response); // Print the response to the terminal
        const uint8Array = response.body;

        // Use TextDecoder to convert Uint8Array to string
        const decoder = new TextDecoder('utf-8');
        const jsonString = decoder.decode(uint8Array);

        // Now jsonString contains the JSON as a string
        console.log(jsonString);
        return response; // Return the response for further use
    } catch (error) {
        console.error(error);
        return error; // Return error for error handling
    }
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await invokeModelCommand();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching Lama Data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}