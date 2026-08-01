from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    openai_api_key: str
    supabase_url: str
    supabase_secret_key: str
    upstash_redis_rest_url: str
    upstash_redis_rest_token: str
    redis_url: str
    rate_limit_max_messages: int = 30
    rate_limit_window_seconds: int = 3600
    chroma_path: str = "./data/chroma"
    knowledge_pdf: str = "./data/knowledge.pdf"
    cors_origin: str = "http://localhost:3000"
    discord_webhook_url: str | None = None


settings = Settings()
