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
    phone_number = db.Column(db.String(15))
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(10))
    nationality = db.Column(db.String(50))
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    _password_hash = db.Column(db.String(), nullable=False, default='')

    # One-to-many relationship with Account
    accounts = db.relationship('Account', backref='user', lazy=True)  # One user can have multiple accounts
    
    # One-to-many relationship with Transaction
    transactions = db.relationship('Transaction', backref='user', lazy=True)  # One user can have multiple transactions
    
    # Many-to-many relationship with Admin (roles)
    roles = db.relationship('Admin', secondary=user_roles, backref='users', lazy=True)

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = self.simple_hash(password)

    def authenticate(self, password):
        return self.simple_hash(password) == self.password_hash

    @staticmethod
    def simple_hash(input):
        return sum(bytearray(input, encoding='utf-8'))


class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100))
    role = db.Column(db.String(50))

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text)
    date = db.Column(db.DateTime)
    timestamp = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    # Many-to-one relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Many transactions belong to one user

class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20))
    balance = db.Column(db.Float)
    account_number = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Many accounts belong to one user
