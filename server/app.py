import os
from flask import Flask, request, make_response, session, jsonify, render_template, send_from_directory
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager, current_user
from models import db, User,  Admin, Account, Transaction, generate_password_hash, check_password_hash
from datetime import timedelta, datetime
from flask_cors import CORS, cross_origin


from dotenv import load_dotenv
load_dotenv()  


# BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/bankingsystem/build',
    template_folder='../client/bankingsystem/build/'
)
# app.config['SQLALCHEMY_DATABASE_URI'] = (DATABASE)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'ne5by5vrhg5v7u7r' 
app.config['JWT_EXPIRATION_DELTA'] = timedelta(hours=2) 
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)

CORS(app)
# CORS(app, resources={r"/*": {"origins": "https://coinsagebanking.netlify.app"}})




# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def serve(path):
#     if path != "" and os.path.exists(f"../client/bankingsystem/build//{path}"):
#         return send_from_directory('../client/bankingsystem/build/', path)
#     else:
#         return send_from_directory('../client/bankingsystem/build/', 'index.html')

# @app.errorhandler(404)
# def not_found(e):
#     return render_template("index.html")


@app.route('/api/user/details', methods=['GET'])
@jwt_required()
def get_user_details():
    try:
        current_user_id = get_jwt_identity()
        # print(f"Current User ID: {current_user_id}")  
        
        user = User.query.get(current_user_id)
        if not user:
            # print("User not found or unauthorized")  
            return jsonify({'error': 'User not found or unauthorized'}), 404
        
        first_name = ""
        last_name = ""
        if user.name:
            try:
                first_name, last_name = user.name.split(maxsplit=1)
            except ValueError:
                first_name = user.name
        
        response = {
            'firstName': first_name,
            'lastName': last_name,
            'email': user.email,
            'phoneNumber': user.phone_number,
            'address': user.address,
            'dateOfBirth': str(user.date_of_birth),  
        }

        # Debug logs
        # print(f"User Data: {response}")
        
        return jsonify(response)
    
    except Exception as e:
        print(f"Error occurred: {e}")  
        return jsonify({'error': 'An error occurred while fetching user details'}), 500



    

    
# route to update the user details
from datetime import datetime

@app.route('/api/user/update', methods=['POST'])
@jwt_required()
def update_user_details():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Update user details based on received data
    user.name = data.get('name')
    user.email = data.get('email')
    user.phone_number = data.get('phone_number')
    user.address = data.get('address')

    # Convert date_of_birth string to datetime.date object
    date_of_birth_str = data.get('date_of_birth')
    if date_of_birth_str:
        user.date_of_birth = datetime.strptime(date_of_birth_str, '%Y-%m-%d').date()

    try:
        db.session.commit()
        return jsonify({'message': 'User details updated successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500




# route to get the user transactions
@app.route('/api/transactions', methods=['GET'])
@jwt_required()
def get_transactions():
    current_user_id = get_jwt_identity()

    try:
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        transactions = Transaction.query.filter_by(user_id=current_user_id).all()
        transactions_list = [transaction.to_dict() for transaction in transactions]

        return jsonify({'transactions': transactions_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    

# route to delete transactions
@app.route('/api/transactions/del/<int:transaction_id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(transaction_id):
    user_id = get_jwt_identity()

    try:
        transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()
        if not transaction:
            return jsonify({'error': 'Transaction not found or does not belong to the user'}), 404

        db.session.delete(transaction)
        db.session.commit()

        return jsonify({'message': 'Transaction deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



    
# Route to get the associated user accounts 
@app.route('/api/accounts', methods=['GET'])
@jwt_required()
def get_accounts():
    current_user_id = get_jwt_identity()

    try:
        accounts = Account.query.filter_by(user_id=current_user_id).all()

        accounts_list = []
        for account in accounts:
            account_data = account.to_dict()
            accounts_list.append(account_data)

        return jsonify({'accounts': accounts_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500



# user dashboard page stuff
@app.route('/dashboard_data', methods=['GET'])
@jwt_required()
def get_dashboard_data():
    user_id = get_jwt_identity()
    
    print(f'Current user ID from token: {user_id}')

    # Fetching data for line chart
    user_transactions = Transaction.query.filter_by(user_id=user_id).all()
    lineData = {
        'labels': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        'datasets': [
            {
                'label': 'Weekly Income',
                'data': [transaction.amount for transaction in user_transactions],
            },
            # Add dataset for Weekly Expenses using similar logic
        ],
    }

    # Fetching data for pie chart (expense breakdown)
    categories = ['Rent', 'Groceries', 'Entertainment']
    expenses_data = [sum(transaction.amount for transaction in user_transactions if transaction.category == category) for category in categories]
    pieData = {
        'labels': categories,
        'datasets': [
            {
                'label': 'Expense Categories',
                'data': expenses_data,
            },
        ],
    }

    # Fetching data for bar chart (monthly balance)
    user_accounts = Account.query.filter_by(user_id=user_id).all()
    barData = {
        'labels': ['January', 'February', 'March', 'April', 'May', 'June'],
        'datasets': [
            {
                'label': 'Monthly Balance',
                'data': [account.balance for account in user_accounts],
            },
        ],
    }

    dashboard_data = {
        'lineData': lineData,
        'pieData': pieData,
        'barData': barData
    }

    return jsonify(dashboard_data), 200

 

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

    new_user = User(email=email, password_hash=password_hash)

    db.session.add(new_user)
    db.session.commit()

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




@app.route('/')
def index():
    return '<h1>Banking System</h1>'

if __name__ == '__main__':
    app.run(port=5000, debug=True)
