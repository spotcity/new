from typing import List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from crud.base import CRUDBase
from db.models import Spot
from db.schemas import SpotCreate, SpotUpdate


class CRUDSpot(CRUDBase[Spot, SpotCreate, SpotUpdate]):
    def get_spots_by_radius(self, db: Session, *, radius: int = 20) -> List[Spot]:
        pass

spot = CRUDSpot(Spot)