from flask import Blueprint

roles = Blueprint('roles', __name__)


@roles.route('/handshake')
def main():
    return {'hand': 'shake'}