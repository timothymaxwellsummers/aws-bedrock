import React, { useEffect, useState } from 'react';

function Home() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/bedrock');
      const data = await response.json();
      console.log(data);
      // Correcting the path to the models array based on your API response structure
      setModels(data.modelSummaries); // Assuming 'data.modelSummaries' is the correct path to your models array
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Available Models</h1>
      <ul>
        {models.map((model, index) => (
          //@ts-ignore
          <li key={index}>{model.modelName}</li> // Assuming model.modelName is the correct way to access the model name
        ))}
      </ul>
    </div>
  );
}

export default Home;
