import weaviate from 'weaviate-client'

const client = await weaviate.connectToLocal({
  host: 'localhost',
  port: 8080,
  grpcPort: 50051,
})


async function addSchema() {
  await client.collections.delete('Question')

  const newCollection = await client.collections.createFromSchema({
    "class": "Question",
    "description": "A question",
    "vectorizer": "text2vec-ollama",
    "moduleConfig": {
      "text2vec-ollama": {
        "apiEndpoint": "http://ollama:11434",
        "model": "nomic-embed-text"
      },
      "generative-ollama": {
        "apiEndpoint": "http://ollama:11434",
        "model": "phi"
      }
    }
  })

  console.log(`We have a new class: ${newCollection.name}`)
}

async function getJsonData() {
  const file = await fetch('https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json');
  return file.json();
}

async function importQuestions() {
  // Get the questions directly from the URL
  const myCollection = client.collections.get('Question');
  const data = await getJsonData();
  const result = await myCollection.data.insertMany(data)
  console.log('We just bulk inserted', result);
}

async function nearTextQuery() {
  const myCollection = client.collections.get('Question');

  const result = await myCollection.query.nearText(['biology'], {
    returnProperties: ['question', 'answer', 'category'],
    limit: 2
  });

  console.log(JSON.stringify(result.objects, null, 2));
  return result;
}

async function generativeSearchQuery() {
  const myCollection = client.collections.get('Question');

  const result = await myCollection.generate.nearText(['biology'], {
    singlePrompt: `Explain {answer} as you might to a five-year-old.`,
  }, {
    limit: 2,
    returnProperties: ['question', 'answer', 'category'],
  });

  console.log(JSON.stringify(result.objects, null, 2));
  return result;
}

async function generativeSearchGroupedQuery() {
  const myCollection = client.collections.get('Question');

  const result = await myCollection.generate.nearText(['biology'],{
    groupedTask: `Write a tweet with emojis about these facts.`,
  },{
    returnProperties: ['question', 'answer', 'category'],
    limit: 2,
  });

  console.log(JSON.stringify(result.generated, null, 2));
  return result;
}

async function run() {
  await addSchema();
  await importQuestions();
  await nearTextQuery();
  await generativeSearchQuery();
  await generativeSearchGroupedQuery();
}

await run();
