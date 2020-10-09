from flask import Blueprint

users = Blueprint('users', __name__)


@users.route('/handshake/')
def handshake():
    return {'hand': 'shake'}