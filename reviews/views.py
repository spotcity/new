from flask import Blueprint

reviews = Blueprint('reviews', __name__)


@reviews.route('/handshake/')
def handshake():
    return {'hand': 'shake'}