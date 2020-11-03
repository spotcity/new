from sqlalchemy import Boolean, Column, Numeric, Integer, String, MetaData
from sqlalchemy.orm import relationship

from db.base_class import Base


class Spot(Base):
    __tablename__ = 'spots'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(32), nullable=False, unique=True)
    latitude = Column(Numeric, index=True)
    longitude = Column(Numeric, index=True)
