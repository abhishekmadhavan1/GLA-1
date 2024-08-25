print('Hello World: ')

variableName = {}
print('variableName: ', variableName)

person = {
    "name": "Alice",
    "age": 30,
    "address": {
        "city": "New York",
        "zipcode": "10001"
    }
}
# city = person['address']['city']
# print('city: ', city)

city = person.get('address').get('city')
print('city: ', city)


students = [
    {
        "name": "Alice",
        "age": 30,
        "address": {
            "city": "New York",
            "zipcode": "10001"
        }
    },
    {
        "name": "Glen",
        "age": 23,
        "address": {
            "city": "New Delhi",
            "zipcode": "10001"
        }
    }
]

student1 = students[0]
print('students: ', type(students))
print('student1: ', type(student1))
student2 = str(students[1])
print('student2: ', type(student2))

# for student in students:
#     print('student: ', student)
    




