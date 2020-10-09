from flask import Blueprint

spots = Blueprint('spots', __name__)


@spots.route('/handshake')
def main():
    return {'hand': 'shake'}