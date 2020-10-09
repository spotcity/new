from requests import get

import pytest

HOST = 'http://127.0.0.1:5000'


def test_reviews_handshake():
    for el in ('reviews', 'roles', 'spots', 'users'):
        resp = get(f'{HOST}/{el}/handshake').json()
        assert resp.get('hand') == 'shake'