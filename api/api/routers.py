from fastapi import APIRouter

from api.endpoints import spots

api_router = APIRouter()
api_router.include_router(spots.router, prefix='/spots', tags=['spots'])
