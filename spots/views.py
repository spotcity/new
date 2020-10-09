from flask import Blueprint, request

from models import db, Spot

spots = Blueprint('spots', __name__)


@spots.route('/handshake/')
def handshake():
    return {'hand': 'shake'}


@spots.route('/add/', methods=['POST'])
def add():
    if request.method == 'POST':
        json_out = {'error': {'id': 0}}
        json_in = request.get_json()

        name = json_in.get('name')
        geo = json_in.get('geo')

        if not all((name, geo)):
            json_out['error']['id'] = -1
            json_out['error']['msg'] = (
                'one of the required parameters is missing'
            )
            return json_out

        spot = Spot(name=name, geo=geo)
        db.session.add(spot)
        db.session.commit()

        json_out['id'] = spot.id

        return json_out


@spots.route('/get/', methods=['POST'])
def get():
    if request.method == 'POST':
        json_out = {'error': {'id': 0}, 'spots': []}
        json_in = request.get_json()

        id_ = json_in.get('id')
        if id_:
            spot = db.session.query(Spot).get(id_)
            json_out['spots'].append(
                {'id': spot.id, 'name': spot.name, 'geo': spot.geo}
            )
            
            return json_out
        
        spots = db.session.query(Spot).all()
        for spot in spots:
            json_out['spots'].append(
                {'id': spot.id, 'name': spot.name, 'geo': spot.geo}
            )

        return json_out