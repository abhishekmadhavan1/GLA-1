from pymongo import MongoClient
from flask import Flask, jsonify, request
from flask_cors import CORS  # pip install flask_cors
from flask_jwt_extended import JWTManager, get_jwt_identity, jwt_required, verify_jwt_in_request
from flask_jwt_extended import create_access_token

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

client = MongoClient("mongodb://localhost:27017/")

mdb = client['glav1']

app.config["JWT_SECRET_KEY"] = "JWT_SECRET_KEY"
jwt = JWTManager(app)


@app.route("/")
def hello_world():
    return "<p>Hello, World Test 3!</p>"


@app.route("/home/<userId>")
def home(userId):
    user = mdb.users.find_one({'_id': int(userId)})
    return {
        "status": 1,
        "message": "success",
        "payload": {
            'title': f"Home Page GET Method {userId}",
            **user
        }
    }


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


@app.route("/db/insert")
def insert():
    list = [
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
    mdb.users.insert_many(list)

    user = {'_id': 5, "name": "student6", "dept": "CSE"}

    mdb.users.insert_one(user)

    return list


@app.route("/db/read")
def read():
    userOne = mdb.users.find_one({"_id": 1}, {'_id': 0})

    users = mdb.users.find({"dept": "CSE"}, {"dept": 1, '_id': 0})

    foundList = []
    for user in users:
        foundList.append(user)

    secondList = []
    for user in users:
        secondList.append(user)

    return {'foundList': foundList, "secondList": secondList, "userOne": userOne}


@app.route("/db/update")
def update():
    mdb.users.update_many(
        {'_id': 5}, {'$set': {'email': 'user5@gmail.com', 'password': '123456'}})

    updatedUsers = []

    for user in mdb.users.find({}):
        updatedUsers.append(user)

    return {"updatedUsers": updatedUsers}


@app.route("/db/remove")
def remove():

    mdb.users.delete_one({"_id": 2})

    return {
        'status': 1,
        'msg': "User Removed",
        'class': "success"
    }


@app.route("/current/user", methods=["GET"])
@jwt_required()
def currentUser():
    userId = get_jwt_identity()
    user = mdb.users.find_one({'_id': userId})
    return user


@app.route("/login", methods=['POST'])
def login():
    input = request.json
    email = input.get('email')
    password = input.get('password')

    user = mdb.users.find_one({'email': email, 'password': password})

    if user and '_id' in user:
        token = create_access_token(identity=user['_id'])
        return {
            'status': 1,
            'msg': "User Exist, Correct Credentials",
            'class': "success",
            'payload': {
                "user": user,
                "token": token
            }
        }

    return {
        'status': 0,
        'msg': "Invalid Credentials",
        'class': "error",
        'payload': {
        }
    }


@app.route("/updateUser", methods=['POST'])
def register():
    input = request.json
    email = input.get('email')
    password = input.get('password')
    mobile = input.get('mobile')
    fullName = input.get('fullName')
    _id = input.get('_id')

    isNew = True if not _id else False
    print('isNew: ', isNew)

    user = mdb.users.find_one({'email': email})

    if user and '_id' in user and isNew:
        return {
            'status': 1,
            'msg': "User Exist, Enter different E-mail",
            'class': "success"
        }

    usersCount = mdb.users.count_documents({})

    user = {
        "email": email,
        "mobile": mobile,
        "fullName": fullName,
        "password": password,
    }

    if isNew:
        user['_id'] = f'Test{usersCount+1}'

        mdb.users.insert_one(user)
        msg = "User Inserted"

    if not isNew:
        mdb.users.find({'$match': 5})
        msg = "User Edited"

    return {
        'status': 1,
        'msg': msg,
        'class': "sucess",
        "payload": {
            'user': user
        }
    }


@app.route("/get/users")
def getUsers():
    users = []

    for user in mdb.users.find({}):
        users.append(user)

    return users
