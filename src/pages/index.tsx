import React, { useEffect, useState } from "react";

function Home() {
  const [models, setModels] = useState([]);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    async function fetchData() {
      const listResponse = await fetch("/api/bedrockClient");
      const listData = await listResponse.json();
      setModels(listData.modelSummaries); // Update this based on your actual API response

      // Removed the answer fetching from here to a separate function to be called on form submit
    }

    fetchData();
  }, []);

  //@ts-ignore
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    // Assuming '/api/bedrockClientRuntime' expects a POST request with the query
    const answerResponse = await fetch("/api/bedrockClientRuntime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const answerData = await answerResponse.json();
    const outputText = answerData.outputs[0].text;
    setAnswer(outputText);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-8">
        Bedrock Chat
      </h1>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Selected model chat</h2>
        <form onSubmit={handleQuerySubmit} className="mb-4">
          <input
            type="text"
            placeholder="Ask your question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition-colors"
          >
            Submit
          </button>
        </form>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="whitespace-pre-line">{answer}</p>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4">Available Models</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {models.map((model, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              {/* @ts-ignore */}
              <p>{model.modelName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
