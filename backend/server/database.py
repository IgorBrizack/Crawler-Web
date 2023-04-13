# biblioteca para lidar com chamadas asyncronas no mongo
import motor.motor_asyncio

from scraper import manage_scrape

from bson.objectid import ObjectId

from fastapi.encoders import jsonable_encoder

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.students
database_products = client.products

students_collection = database.get_collection("students_collection")
products_collection = database_products.get_collection("products_collection")

# async def product_helper(products) -> 'list[dict]':
#     products_list = []

#     for product in await products.to_list(length=1000):
#         products_list.append({
#             "id": str(product["_id"]),
#             "product_type": str(product["product_type"]),
#             "description": product["description"],
#             "website": product["website"],
#             "external_link": product["external_link"],
#             "image_link": product['igame_link']
#         })

#     content = { 'products' : products_list}
#     print(content)
#     return content

def student_helper(student) -> dict:
    return {
        "id": str(student["_id"]),
        "fullname": student["fullname"],
        "email": student["email"]
    }

# Retrieve all students present in the database
async def retrieve_students():
    students = []
    async for student in students_collection.find():
        student.append(student_helper(student))
    return students


async def add_product(website: str, product: str):
    scrape_data = manage_scrape(website, product)

    await products_collection.insert_many(scrape_data)
    new_products = products_collection.find({"website": "Mercado Livre"})

    products_list = []

    for prod in await new_products.to_list(length=1000):
        products_list.append({
            "id": str(prod["_id"]),
            "product_type": str(prod["product_type"]),
            "description": prod["description"],
            "website": prod["website"],
            "external_link": prod["external_link"],
            "image_link": prod['image_link']
        })
    
    print(products_list)

    return products_list


# Add a new student into to the database
async def add_student(student_data: dict) -> dict:
    student = await students_collection.insert_one(student_data)
    new_student = await students_collection.find_one({"_id": student.inserted_id})
    return student_helper(new_student)

# Retrieve a student with a matching ID
async def retrieve_student(id: str) -> dict:
    student = await students_collection.find_one({"_id": ObjectId(id)})
    if student:
        return student_helper(student)
    
# Update a student with a matching ID
async def update_student(id: str, data: dict):
    #return false if an empty request body is sent.
    if len(data) < 1:
        return False
    stundent = await students_collection.find_one({"_id": ObjectId(id)})
    if stundent:
        update_student = await students_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if update_student:
            return True
        return False

# Delete a student from the database
async def delete_student(id: str):
    student = await students_collection.find_one({"_id": ObjectId(id)})
    if student:
        await students_collection.delete_one({"_id": ObjectId(id)})
        return True