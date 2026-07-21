from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

from app.config import settings

def get_vectorstore() -> Chroma:
    return Chroma(persist_directory=settings.chroma_path, embedding_function=OpenAIEmbeddings(api_key=settings.openai_api_key), collection_name="hexagon_knowledge")

def retrieve_context(question: str, k: int = 4) -> str:
    store = get_vectorstore()
    docs = store.similarity_search(question, k=k)
    if not docs:
        return ""
    return "\n--\n\n".join(doc.page_content for doc in docs)