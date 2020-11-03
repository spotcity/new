from typing import Optional

from pydantic import BaseModel


class SpotBase(BaseModel):
    latitude: float
    longitude: float
    name: str


class SpotCreate(SpotBase):
    pass


class SpotUpdate(SpotBase):
    pass


class Spot(SpotBase):
    id: int

    class Config:
        orm_mode = True