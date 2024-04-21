#!/usr/bin/env python3
import os
import sys
from flask import Flask, request, make_response, session, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager, current_user
from models import db, User,  Admin, Account, Transaction, generate_password_hash, check_password_hash
from datetime import timedelta, datetime
from flask_cors import CORS, cross_origin

try:
    from dotenv import load_dotenv
    load_dotenv()  # Attempt to load environment variables from .env file
except ImportError:
    pass

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/bankingsystem/build',
    template_folder='../client/bankingsystem/build/'
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', DATABASE)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'ne5by5vrhg5v7u7r' 
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=2) 
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)

CORS(app)



# @app.route('/transaction_details', methods=['GET'])
# @jwt_required()
# def get_transaction_details():
#     user_id = get_jwt_identity()

#     user_transactions = Transaction.query.filter_by(user_id=user_id).all()

#     transactions_data = [transaction.to_dict() for transaction in user_transactions]

#     return jsonify({'transactions': transactions_data}), 200

@app.route('/transaction_details', methods=['GET'])
@jwt_required()
def get_transaction_details():
    user_id = get_jwt_identity()

    user_transactions = Transaction.query.filter_by(user_id=user_id).all()

    transactions_data = [
        {   
            'id' : transaction.id,
            'description': transaction.description,
            'amount': transaction.amount,
            'date': transaction.date.strftime('%Y-%m-%d %H:%M:%S')  # Format date as string
        }
        for transaction in user_transactions
    ]

    return jsonify({'transactions': transactions_data}), 200

# route to delete transactions
@app.route('/transaction/<int:transaction_id>', methods=['DELETE'])
@jwt_required()
@cross_origin() 
def delete_transaction(transaction_id):
    user_id = get_jwt_identity()

    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    if not transaction:
        return jsonify({'error': 'Transaction not found or does not belong to the user'}), 404

    db.session.delete(transaction)
    db.session.commit()

    return jsonify({'message': 'Transaction deleted successfully'}), 200



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
    
    
# route to edit and update the user details
@app.route('/edit_user', methods=['PUT'])
@jwt_required()
def edit_user_details():
    user_id = get_jwt_identity()
    data = request.get_json()

    user = User.query.get(user_id)

    if user:
        if 'name' in data:
            user.name = data['name']
        if 'address' in data:
            user.address = data['address']
        if 'phone_number' in data:
            user.phone_number = data['phone_number']
        if 'date_of_birth' in data:
            user.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d')
        if 'gender' in data:
            user.gender = data['gender']
        if 'nationality' in data:
            user.nationality = data['nationality']

        db.session.commit()

        return jsonify({'message': 'User details updated successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404


# route to get the account deails
@app.route('/account_details', methods=['GET'])
@jwt_required()
def get_account_details():
    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if user:
        accounts = Account.query.filter_by(user_id=user.id).all()
        
        account_list = []
        for account in accounts:
            account_list.append({
                'id': account.id,
                'type': account.type,
                'balance': account.balance,
                'account_number': account.account_number,
                'user_id': account.user_id
            })

        return jsonify({'accounts': account_list}), 200
    else:
        return jsonify({'error': 'User not found'}), 404
 

# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({'error': 'Email and password are required'}), 400

#     existing_user = User.query.filter_by(email=email).first()
#     if existing_user:
#         return jsonify({'error': 'Email already exists'}), 400

#     password_hash = generate_password_hash(password)

#     new_user = User(email=email, password=password_hash)

#     db.session.add(new_user)
#     db.session.commit()

#     return jsonify({'message': 'User created successfully'}), 201

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

    # Generate access token for the newly created user
    access_token = create_access_token(identity=new_user.id)

    return jsonify({'message': 'User created successfully', 'access_token': access_token}), 201



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




# @app.route('/')
# def index():
#     return '<h1>Banking System</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)
