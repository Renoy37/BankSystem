from faker import Faker
from app import app, db
from models import Account, User, Admin, Transaction
from random import randint

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
            user = User(
                name=fake.name(),
                address=fake.address(),
                phone_number=fake.phone_number(),
                date_of_birth=fake.date_of_birth(),
                gender=fake.random_element(elements=('Male', 'Female', 'Other')),
                nationality=fake.country(),
                email=fake.email(),
                password=default_password,
                zip_code=fake.zipcode(),
                active_status=fake.random_element(elements=('Active', 'Inactive')),
            )
            db.session.add(user)
        db.session.commit()
        print("Users created successfully.")

def seed_admins():
    with app.app_context():
        print("Creating admins...")
        default_password = 'adminpassword'
        for _ in range(5):
            admin = Admin(
                username=fake.user_name(),
                email=fake.email(),
                name=fake.name(),
                role=fake.random_element(elements=('Admin', 'Super Admin')),
                password=default_password,
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

if __name__ == "__main__":
    clear_db()
    seed_users()
    seed_admins()
    seed_accounts()
    seed_transactions()
