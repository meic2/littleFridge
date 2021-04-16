from flask import Blueprint, redirect, url_for
from . import db

auth = Blueprint('auth', __name__)


@auth.route('/login')
def login():
    return 'Login'


@auth.route('/signup', methods=['POST'])
def signup():
    # code to validate and add user to database goes here
    return redirect(url_for('auth.login'))


@auth.route('/logout')
def logout():
    return 'Logout'
