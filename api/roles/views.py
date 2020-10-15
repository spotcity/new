from flask import Blueprint

roles = Blueprint('roles', __name__)


@roles.route('/handshake/')
def handshake():
    return {'hand': 'shake'}