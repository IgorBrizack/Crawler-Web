from fastapi import FastAPI

from server.routes.product import router as ProductRouter

app = FastAPI()

app.include_router(ProductRouter, tags=["Product"], prefix="/product")

@app.get("/", tags=["root"])
async def read_root():
    return{"message": "Welcome to this fantastic app!"}