from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    add_product,
    delete_student,
    retrieve_student,
    retrieve_students,
    update_student,
)

from server.models.product import (
    ErrorResponseModel, 
    ResponseModel, 
    ProductSchema,
    UpdateProductModel,
)

router = APIRouter()

@router.post("/", response_description="Product Data")
async def add_products_data(product: ProductSchema = Body(...)):
    products = jsonable_encoder(product)
    new_products = await add_product(products["website"], products['product_type'])
    return ResponseModel(new_products, "Student added sccessfully")