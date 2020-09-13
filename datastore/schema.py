from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.engine.url import URL
import os

# HELPFUL CHEAT-SHEET: https://www.pythonsheets.com/notes/python-sqlalchemy.html

# --------------------------------------------------------------------------------
# CONSTANTS
# --------------------------------------------------------------------------------



engine = create_engine(os.getenv("DATABASE_URL"))
Base = declarative_base()


# --------------------------------------------------------------------------------
# TABLES
# --------------------------------------------------------------------------------

class User(Base):
    __tablename__ = 'users'
    id   = Column(Integer, primary_key=True)
    name  = Column(String, nullable=False)
    task1 = Column(String, nullable=True)
    task2 = Column(String, nullable=True)
    task3 = Column(String, nullable=True)




# --------------------------------------------------------------------------------
# SETUP
# --------------------------------------------------------------------------------

Base.metadata.create_all(bind=engine)
Session = sessionmaker()
Session.configure(bind=engine)

# add a user
"""
try:
    _session = Session()
    row = User(name='Joe Boylson', task='Task')
    _session.add(row)
    _session.commit()
except Exception as e:
    print(e)
finally:
    _session.close()
    """


    