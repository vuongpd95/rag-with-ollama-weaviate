# Learn

Làm tuần tự (1) và (2). (3) và (4) có thể chọn bất kỳ 1 cái để học trước. (3) và (4) liên quan tới nhau. (3) dễ hơn do GCP (Google Cloud Platform) đã abstract hết những cái khó, (4) khó hơn do mình phải tự setup. Các step trong từng mục (1 - 4) chỉ mang tính chỉ dẫn sơ lược, thực tế sẽ phải tự nghiên cứu các kiến thức liên quan nhiều

Đáp án cho (2) + (4) là code của repo này, xem phần Solution ở dưới

1. Làm quen với Generative AI model
- Tự đọc hiểu Ollama là gì?
- Cài đặt Ollama: https://ollama.com/
- Pull phi bằng Ollama https://ollama.com/library/phi
- Thực hành Prompt model phi sử dụng Ollama https://ollama.com/library/phi

3. Làm quen với Docker & Docker Compose
- Tự đọc hiểu docker & docker compose là gì?
- Cài đặt docker & docker compose https://docs.docker.com/engine/install/debian/
- Tạo docker-compose file với 2 services
    - ollama https://ollama.com/
    - open webui https://github.com/open-webui/open-webui
- Pull phi bằng cách /bin/bash vào ollama container
- Thực hành Prompt phi qua giao diện open webui

5. Làm quen với GCP Agent Builder
- Tự đọc hiểu Agent Builder là gì?
- Đăng ký tài khoản GCP (cần debit/credit card)
- Tạo Agent đầu tiên ở https://console.cloud.google.com/gen-app-builder/engines (1000$ free Agent Builder credit & 300$ free GCP credit)
- Sử dụng datastore để lưu + index FAQ về bản thân
- Xác thực datastore chạy được bằng cách test trên Agent Preview Chat

7. Tìm hiểu cách RAG hoạt động
- Đọc & hiểu
    - RAG là gì?
    - Vector DB là gì? Lưu cái gì và thuật toán search Vector DB được thực thi như thế nào?
- Thực hành setup Vector DB weaviate
	- Thêm 1 service vào file docker compose ở mục (2) gọi là weaviate (vector DB) https://weaviate.io/
	- Pull nomic-embed-text về cho ollama bằng cách /bin/bash vào ollama container https://ollama.com/library/nomic-embed-text
    - Kết nối service ollama với weaviate bằng cách enable 2 modules: text2vec-ollama, generative-ollama để tạo collection
        - Sử dụng nomic-embed-text làm embedding model
		- Sử dụng phi làm generative model
	- Thực hành sử dụng Vector DB weaviate bằng cách viết script (Python hoặc JS/TS):
		- Tạo 1 collection trong weaviate sử dụng `createFromSchema`
			- https://weaviate.io/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-ollama
			- https://weaviate.io/developers/weaviate/modules/reader-generator-modules/generative-ollama#example-1
		- Insert 1 record vào collection vừa tạo https://weaviate.io/developers/weaviate/manage-data/create
		- Thực hiện 1 nearText query tới weaviate https://weaviate.io/developers/weaviate/search/similarity#named-vectors

# Solution

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
