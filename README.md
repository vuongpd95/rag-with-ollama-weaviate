# Setup

1. Config Ollama from Docker to use GPU https://hub.docker.com/r/ollama/ollama

2. Create containers

```bash
docker-compose up
```

3. Access ollama to pull phi and nomic-embed-text

```bash
docker exec -it ollama /bin/bash
# inside container
ollama pull phi
ollama pull nomic-embed-text
```

4. Access ollama-webui at `http://localhost:8081`

5. Install npm dependencies

```bash
cd rag-with-ollama-weaviate
npm install # need npm pre-installed with node 20
```

6. Run the script

```bash
npm run compile
npm run exec
```
