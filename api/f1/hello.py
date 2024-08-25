from pymongo import MongoClient
from flask import Flask

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")

mdb = client['glav1']


@app.route("/")
def hello_world():
    return "<p>Hello, World Test 3!</p>"


@app.route("/home")
def home():
    return "This is the <b>Home Page</b>"


@app.route("/if-elif-else")
def conditionalRendering():
    value = 1
    if value == 2:
        return "The value is equal to 2"
    elif value < 2:
        return "The value is less than 2"
    else:
        return "No Conditions were satisfied"


@app.route("/inline-If")
def inlineIf():
    value = '2'

    return value


@app.route("/for-loop")
def forLoop():
    marks = [1, 1, 2, 3, 4, 5, 6, 7, 8]
    totalMarks = 0

    for mark in marks:
        if mark == 1:
            pass
        totalMarks = totalMarks + mark

    return {
        "status": 1,
        "status": 2,
        "message": "success",
        "payload": {
            'totalMarks': totalMarks,
            'values': marks
        }
    }


@app.route("/while-loop")
def whileLoop():
    value = 1
    counts = []

    while value < 10:
        value = value + 1
        counts.append(value)

    return {
        "status": 1,
        "message": "success",
        "payload": {
            'counts': counts,
            'value': value
        }
    }


@app.route("/do-while-loop")
def doWhileLoop():
    value = 9
    counts = []

    while True:
        value = value + 1
        counts.append(value)
        if (value > 9):
            break

    return {
        "status": 1,
        "message": "success",
        "payload": {
            'counts': counts,
            'value': value
        }
    }


def multiply(arg1, arg2=1):
    value = arg1 * arg2
    if value > 10:
        multiply(10, 2)
    return value


@app.route("/function")
def functionInPython():

    value = multiply(9, 2)

    return {
        "status": 1,
        "message": "success",
        "payload": {
            "value": value
        }
    }


@app.route("/user/<userName>")
def dynamicRoutes(userName):
    value = f"The user name is {userName}"

    return {
        "status": 1,
        "message": "success",
        "payload": {
            "value": value
        }
    }


@app.route("/db")
def dataBase():
    users = [
        {
            "_id": 4,
            "name": "student4",
            "dept": "CSE",
        },
        {
            "_id": 5,
            "name": "student5",
            "dept": "CSE",
        }
    ]
    mdb.users.insert_one(users)

    return users
