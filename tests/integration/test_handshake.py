from requests import get

import pytest


def test_handshake():
    resp = get('http://127.0.0.1:5000/handshake').json()
    assert resp.get('hand') == 'shake' 