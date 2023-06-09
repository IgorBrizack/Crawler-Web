from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    add_product,
    get_products,
)

from server.models.product import (
    ErrorResponseModel, 
    ResponseModel, 
    ProductSchema,
    UpdateProductModel,
)

router = APIRouter()

@router.post("/", response_description="Insert Products Data")
async def add_products_data(product: ProductSchema = Body(...)):
    products = jsonable_encoder(product)
    new_products = await add_product(products["website"], products['product_type'])
    return ResponseModel(new_products, "Product added successfully")


@router.get("/get_products/{website}/{product_type}", response_description="Search for Products")
async def get_products_data(website: str, product_type: str):
    data_products = await get_products(website, product_type)
    return ResponseModel(data_products, "Get products succesfully")