import os
import json
from flask import Flask, url_for, request, render_template, redirect, abort, session
from markupsafe import escape
app = Flask(__name__)
import routes

# Select config
try:
    env = os.environ['APP_ENV']
except KeyError as e:
    app.logger.error('Unknown environment key, defaulting to Development')
    env = 'DevelopmentConfig'
    app.config.from_object('config.%s' % env)

@app.route('/')
def index():
    if 'username' in session:
        #return 'Logged in as %s' % )
        return f'''
        Logged in as {escape(session['username'])}
        <br>
        <a href="http://127.0.0.1:5000/logout">logout</a>
    '''
    return '''
        You are not logged in
        <br>
        <a href="http://127.0.0.1:5000/login">login</a>
    '''


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return '''
        <form method="post">
            <p><input type=text name=username>
            <p><input type=submit value=Login>
        </form>
    '''

@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))


@app.route('/flask_config')
def flask_config():
    return json.dumps(app.config, indent=4, sort_keys=True, default=str)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
