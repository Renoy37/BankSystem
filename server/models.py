
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Association table for many-to-many relationship between users and roles
user_roles = db.Table(
    'user_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('admin_id', db.Integer, db.ForeignKey('admins.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
     
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(255))
    phone_number = db.Column(db.String(30))
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(10))
    nationality = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True, nullable=False)
    _password_hash = db.Column(db.String(), nullable=False, default='')

    accounts = db.relationship('Account', backref='user', lazy=True)  
    transactions = db.relationship('Transaction', backref='user', lazy=True)  
    roles = db.relationship('Admin', secondary=user_roles, backref='users', lazy=True)
    
    serialize_only = ('name', 'address', 'phone_number', 'email', 'date_of_birth', 'gender', 'nationality')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self._password_hash, password)

class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100))
    role = db.Column(db.String(50))
    _password_hash = db.Column(db.String(), nullable=False, default='')
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self._password_hash, password)

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transactions'
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.DateTime)
    category = db.Column(db.String(50)) 
    timestamp = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    serialize_rules = ('id', 'amount', 'description', 'date', 'category' , 'user_id')

class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20))
    balance = db.Column(db.Float)
    account_number = db.Column(db.String(40))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    serialize_rules = ('type', 'balance', 'account_number')




