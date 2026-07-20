from pathlib import Path

from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.config import settings

def ingest_pdf() -> None:
    pdf_path = Path(settings.knowledge_pdf)
    if not pdf_path.exists():
        raise FileNotFoundError(f"Brak pliku PDF: {pdf_path}")

    loader = PyPDFLoader(str(pdf_path))
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=120)
    chunks = splitter.split_documents(docs)

    Path(settings.chroma_path).mkdir(parents=True, exist_ok=True)

    Chroma.from_documents(documents=chunks, embedding=OpenAIEmbeddings(), persist_directory=settings.chroma_path, collection_name="hexagon_knowledge")
    print(f"Zindeksowano {len(chunks)} fragmentów do Chroma.")

if __name__ == "__main__":
    ingest_pdf()