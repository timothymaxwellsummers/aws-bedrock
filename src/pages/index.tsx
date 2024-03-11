import React, { useEffect, useState } from 'react';

function Home() {
  const [models, setModels] = useState([]);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    async function fetchData() {
      const listResponse = await fetch('/api/bedrockClient');
      const listData = await listResponse.json();
      console.log(listData);
      // Correcting the path to the models array based on your API response structure
      setModels(listData.modelSummaries); // Assuming 'data.modelSummaries' is the correct path to your models array

      const answerResponse = await fetch('/api/bedrockClientRuntime');
      const answerData = await answerResponse.json();
      console.log(answerData);
      setAnswer(answerData.answer);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-xl'>Available Models</h1>
      <ul>
        {models.map((model, index) => (
          //@ts-ignore
          <li key={index}>{model.modelName}</li> // Assuming model.modelName is the correct way to access the model name
        ))}
      </ul>
      <h3 className='text-xl'>{answer}</h3>
    </div>
  );
}

export default Home;
