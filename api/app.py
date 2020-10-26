from typing import Optional
from fastapi import FastAPI, Request
from pydantic import BaseModel

app = FastAPI()
app = FastAPI(root_path="/api")

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
    return {"message": "Hello World", "root_path": request.scope.get("root_path")}

# emulate flask stubs
@app.get("/spots/handshake")
def handshake():
    return {"fastapi": "handshake"}

@app.post("/spots/get/")
def getall():
    return {
        "error": {
            "id": 0
        },
        "spots": [
            {
                "geo": "6666.666, 9999.6666",
                "id": 1,
                "name": "aaa"
            },
            {
                "geo": "777.8888, 5555.6666",
                "id": 2,
                "name": "bbb"
            }
        ]
    }
