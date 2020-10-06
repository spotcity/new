import os
import logging
import json
from flask import Flask
app = Flask(__name__)

# Select config
try:
    env = os.environ['APP_ENV']
except KeyError as e:
    logging.error('Unknown environment key, defaulting to Development')
    env = 'DevelopmentConfig'
    app.config.from_object('config.%s' % env)

@app.route('/')
def hello_world():
    return 'Hello, World1111!'

@app.route('/flask_config')
def flask_config():
    return json.dumps(app.config, indent=4, sort_keys=True, default=str)


if __name__ == '__main__':
    app.run(host='0.0.0.0')
