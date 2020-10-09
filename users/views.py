from flask import Blueprint

users = Blueprint('users', __name__)


@users.route('/handshake')
def main():
    return {'hand': 'shake'}