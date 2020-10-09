from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Spot(db.Model):
    __tablename__ = 'spots'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32), nullable=False, unique=True)
    geo = db.Column(db.String(64), nullable=False, unique=True)
