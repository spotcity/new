from __main__ import app
from markupsafe import escape
from flask import Flask, url_for, request, render_template

# Variables processing
@app.route('/user/<username>')
def show_user_profile(username):
    # show the user profile for that user
    return f"User {escape(username)}"


@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return 'Post %d' % post_id


@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return f"Subpath {escape(subpath)}"

# Slash behaviour
@app.route('/projects/')
def projects():
    return 'The project page'


@app.route('/about')
def about():
    return 'The about page'


# Template example
@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)

# dict -> JSON response
@app.route("/me")
def me_api():
    return {
        "username": "WOW",
        "theme": "Theme",
        "image": url_for("static", filename='cat.jpg'),
    }
