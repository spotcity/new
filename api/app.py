from typing import Optional
from fastapi import FastAPI, Request
from pydantic import BaseModel

app = FastAPI(
    root_path="/api",
    title="spotcity api",
    description="Micro-community app based around points of interest in the city",
    version="0.1.1"
)

class Item(BaseModel):
    name: str
    price: float
    is_offer: Optional[bool] = None

    class Config:
        schema_extra = {
            "example": {
                "name": "Foo",
                "price": 35.4,
                "is_offer": True,
            }
        }


@app.get("/")
def read_root(request: Request):
    return {"message": "Hello World!", "root_path": request.scope.get("root_path")}

# stubs
stub_spots = [
    {
        "id": 0,
        "name": "Surf Coffee x Solyanka",
        "geo": "55.754071, 37.637366",

    },
    {
        "id": 1,
        "name": "Surf Coffee x Mayak",
        "geo": "55.767694, 37.599575",

    },
    {
        "id": 2,
        "name": "Surf Coffee x Secret Spot",
        "geo": "55.721572, 37.611835",

    },
    {
        "id": 3,
        "name": "Surf Coffee x Sport",
        "geo": "55.724723, 37.562360",

    },
    {
        "id": 4,
        "name": "Surf Coffee x G-SPOT",
        "geo": "55.761177, 37.632409",
    }
]


@app.get("/spots")
def get_spots():
    return stub_spots


@app.get("/spots/{item_id}")
def get_spot(item_id: int):
    try:
        return stub_spots[item_id]
    except IndexError:
        return {"Error": "No spot found with such id"}


@app.get("/spots/handshake")
def handshake():
    return {"fastapi": "handshake"}
