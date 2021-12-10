from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
import os
import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=False, nullable=False)
    email = db.Column(db.String(40), unique=True, nullable=False)
    modified = db.Column(
        db.DateTime(), server_default=db.func.now(), onupdate=db.func.now())

    def __repr__(self):
        return f"ID: {self.id}, {self.name}, {self.email}"


if not os.path.isfile('data/db.sqlite3'):
    logging.info("Creating database file")
    db.create_all()


def parseUsers(data):
    def parseUser(user):
        return {"id": user.id, "name": user.name, "email": user.email}
    if type(data) is list:
        return [parseUser(item) for item in data]
    return parseUser(data)


@app.route('/list')
def getList():
    timestamp = request.args.get('timestamp', '1970-01-01T00:00:00')
    try:
        users = User.query.filter(User.modified > timestamp).all()
        logging.info(f"Responding with {len(users)} users")
        return jsonify(parseUsers(users))
    except ValueError:
        logging.error("Invalid timestamp format")
        return jsonify([])


@app.route('/user', methods=['POST'])
def createUser():
    name = request.json.get('name', '')
    email = request.json.get('email', '')

    if len(name) < 4 or len(email) == 0:
        return jsonify({})

    try:
        user = User(name=name, email=email)
        db.session.add(user)
        db.session.commit()
        return jsonify(parseUsers(user))

    except exc.IntegrityError:
        db.session.rollback()
        return jsonify({})


@app.route('/user/<uid>', methods=['GET', 'PUT', 'DELETE'])
def handleUser(uid):
    try:
        user = User.query.get(uid)
        if user is None:
            raise ValueError("Invalid id")
    except (TypeError, ValueError):
        return jsonify({})

    if request.method == 'PUT':
        name = request.json.get('name', '')
        email = request.json.get('email', '')
        if len(name) < 4:
            name = user.name
        if len(email) == 0:
            email = user.email
        try:
            user.name = name
            user.email = email
            db.session.commit()
        except exc.IntegrityError:
            db.session.rollback()

    if request.method == 'DELETE':
        try:
            db.session.remove(user)
        except TypeError:
            db.session.rollback()

    return jsonify(parseUsers(user))
