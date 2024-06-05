from datetime import datetime
from werkzeug.security import generate_password_hash
from models import db, User, Admin, Transaction, Account
from app import app

def clear_database():
    """Clear all data from the database."""
    print("Clearing all data from the database...")
    
    # Delete entries in the correct order to avoid foreign key violations
    db.session.query(Transaction).delete()
    db.session.query(Account).delete()
    db.session.query(User).delete()
    db.session.query(Admin).delete()
    db.session.commit()
    print("Database cleared.")

def seed_data():
    with app.app_context():
        """Seed the database with sample data."""
        clear_database()

        # Seed users
        users = []
        for i in range(1, 51):
            email = f'john{i}@gmail.com.com'  # Generate unique email for each user
            user = User(
                name=f'User {i}',
                address=f'{i} Main St',
                phone_number=f'123-456-700{i}',
                date_of_birth=datetime(1990, 5, 15),
                gender='Male' if i % 2 == 0 else 'Female',
                nationality='American' if i % 3 == 0 else 'Canadian',
                email=email,
                password_hash=f'password{i}'
            )
            db.session.add(user)
            users.append(user)
        
        db.session.flush()  # Ensure user.id is populated
        print("Added Users and flushed.")

        # Seed transactions for each user
        for user in users:
            for j in range(1, 51):  # Each user has at least 50 transactions
                transaction = Transaction(
                    amount=1000.0 + j * 10,
                    description=f'Transaction {j} for User {user.id}',
                    date=datetime.now(),
                    user_id=user.id
                )
                db.session.add(transaction)
            print(f"Added 50 transactions for User {user.id}")

        # Add one admin
        admin = Admin(
            username='admin',
            email='admin@example.com',
            password_hash='adminpassword',
            name='Admin',
            role='Super Admin'
        )
        db.session.add(admin)
        db.session.flush()  # Ensure admin.id is populated
        print("Added Admin: admin@gmail.com")

        # Seed accounts for each user
        for user in users:
            account = Account(
                type='Savings' if user.id % 2 == 0 else 'Checking',
                balance=5000.0 + user.id * 100,
                account_number=f'123456789{user.id}',
                user_id=user.id
            )
            db.session.add(account)
            print(f"Added Account for User {user.id}: {account.account_number}")

        db.session.commit()
        print("Database seeding completed.")

if __name__ == '__main__':
    seed_data()
