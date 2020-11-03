from typing import Any, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api import deps
import db.schemas as schemas
import db.models as models
import crud

router = APIRouter()


@router.get("/", response_model=List[schemas.Spot])
def read_spots(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve spots.
    """
    users = crud.spot.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=schemas.Spot)
def create_spot(
    *,
    db: Session = Depends(deps.get_db),
    spot_in: schemas.SpotCreate,
) -> Any:
    """
    Create new spot.
    """
    # ДОБАВИТЬ ПРОВЕРКУ НА СУЩЕСТВОВАНИЕ ТАКОЙ ТОЧКИ
    user = crud.spot.create(db, obj_in=spot_in)
    return user