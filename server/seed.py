#!/usr/bin/env python3

from faker import Faker
from app import app, db
from models import Account, user_roles, User, Admin, Transaction
from random import randint, choice

fake = Faker()

def clear_db():
    with app.app_context():
        print("Clearing database...")
        db.session.query(Account).delete()
        db.session.query(User).delete()
        db.session.query(Admin).delete()
        db.session.query(Transaction).delete()
        db.session.commit()

def seed_users():
    with app.app_context():
        print("Creating users...")
        default_password = 'password'  
        for _ in range(20):
            password_hash = User.simple_hash(default_password)  # Hashing the default password
            user = User(
                name=fake.name(),
                address=fake.address(),
                phone_number=fake.phone_number(),
                date_of_birth=fake.date_of_birth(),
                gender=fake.random_element(elements=('Male', 'Female', 'Other')),
                nationality=fake.country(),
                email=fake.email(),
                password=default_password,  # Setting the default password
                password_hash=password_hash  
            )
            db.session.add(user)
        db.session.commit()
        print("Users created successfully.")



def seed_admins():
    with app.app_context():
        print("Creating admins...")
        default_password = 'adminpassword'  # Default password
        for _ in range(5):
            # password_hash = Admin.simple_hash(default_password)  # Hash the default password
            # password_hash = default_password
            admin = Admin(
                username=fake.user_name(),
                email=fake.email(),
                name=fake.name(),
                role=fake.random_element(elements=('Admin', 'Super Admin')),
                password=default_password,  # Set the default password
                # password_hash=password_hash  # Set the hashed password
            )
            db.session.add(admin)
        db.session.commit()
        print("Admins created successfully.")



def seed_accounts():
    with app.app_context():
        print("Creating accounts...")
        users = User.query.all()
        for user in users:
            account = Account(
                type=fake.random_element(elements=('Savings', 'Checking', 'Credit')),
                balance=randint(100, 10000),
                account_number=fake.iban(),
                user=user
            )
            db.session.add(account)
        db.session.commit()
        print("Accounts created successfully.")

def seed_transactions():
    with app.app_context():
        print("Creating transactions...")
        users = User.query.all()
        for user in users:
            for _ in range(randint(5, 15)):
                transaction = Transaction(
                    amount=randint(-1000, 1000),
                    description=fake.sentence(),
                    date=fake.date_time_this_year(),
                    user=user
                )
                db.session.add(transaction)
        db.session.commit()
        print("Transactions created successfully.")

# def test_authentication():
#     with app.app_context():
#         user = User.query.first()
#         admin = Admin.query.first()

#         print(f"Testing authentication for user {user.email}...")
#         if user.authenticate('password'):
#             print("User authentication successful!")
#         else:
#             print("User authentication failed!")

#         print(f"Testing authentication for admin {admin.email}...")
#         if admin.authenticate('adminpassword'):
#             print("Admin authentication successful!")
#         else:
#             print("Admin authentication failed!")

if __name__ == "__main__":
    clear_db()
    seed_users()
    seed_admins()
    seed_accounts()
    seed_transactions()
    # test_authentication()
