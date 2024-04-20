#!/usr/bin/env python3

from flask import Flask, request, make_response, session, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from models import db, User,  Admin, Account, Transaction, generate_password_hash, check_password_hash
from datetime import timedelta
from flask_cors import CORS 
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'ne5by5vrhg5v7u7r' 
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=1) 
app.json.compact = False


db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)

CORS(app) 


@app.route('/transactions', methods=['GET'])
@jwt_required()  
def get_transactions():
    transactions = Transaction.query.all()

    transaction_list = []
    for transaction in transactions:
        transaction_list.append({
            'id': transaction.id,
            'amount': transaction.amount,
            'description': transaction.description,
            'date': transaction.date.strftime('%Y-%m-%d %H:%M:%S'),  
            'user_id': transaction.user_id
        })

    return jsonify({'transactions': transaction_list}), 200

# route to get user delatils
@app.route('/user_details', methods=['GET'])
@jwt_required()  
def get_user_details():
    user_id = get_jwt_identity()
    
    user = User.query.get(user_id)

    if user:
        user_dict = user.to_dict()
        return jsonify(user_dict), 200
    else:
        return jsonify({'error': 'User not found'}), 404

# route to get the account deails
@app.route('/account_details', methods=['GET'])
@jwt_required()  
def get_account_details():
    user_id = get_jwt_identity()
    
    savings_account = Account.query.filter_by(type='Savings', user_id=user_id).first()
    checking_account = Account.query.filter_by(type='Checking', user_id=user_id).first()

    if savings_account and checking_account:
        savings_data = savings_account.to_dict(rules=('type', 'balance', 'account_number'))
        checking_data = checking_account.to_dict(rules=('type', 'balance', 'account_number'))
        
        response_data = {
            'Savings Account': savings_data,
            'Checking Account': checking_data
        }
        return jsonify(response_data), 200
    else:
        return jsonify({'error': 'One or both accounts not found'}), 404

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    password_hash = generate_password_hash(password)

    new_user = User(email=email, password=password_hash)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201




@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'User does not exist'}), 401
    else:
        password_correct = check_password_hash(user.password_hash, password)
        session['user_id'] = user.id

    access_token = create_access_token(identity=user.id)

    return jsonify({'message': 'Logged in successfully', 'access_token' : access_token}), 200




@app.route('/')
def index():
    return '<h1>Banking System</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)
