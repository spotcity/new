from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "spotcity api"
    app_version: str = "0.1.0"
    app_description: str = "Micro-community app based around points of interest in the city"
    root_path: str = "/api"
    db_path: str = "postgres uri goes here"

settings = Settings()
