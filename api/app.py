import os
from typing import Optional
from fastapi import FastAPI, Request
from pydantic import BaseModel

from api.routers import api_router

from config import settings

app = FastAPI(
    root_path=os.getenv("API_PATH", "/api"),
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version
)


@app.get("/")
def read_root(request: Request):
    return {"message": "Hello World!", "root_path": request.scope.get("root_path")}

app.include_router(api_router)
