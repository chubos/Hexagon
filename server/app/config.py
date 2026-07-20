from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    openai_api_key: str
    redis_url: str = "redis://localhost:6379"
    chroma_path: str = "./data/chroma"
    leads_dir: str = "./data/leads"
    knowledge_pdf: str = "./data/knowledge.pdf"
    cors_origin: str = "http://localhost:3000"


settings = Settings()