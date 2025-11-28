from fastapi import FastAPI, File, UploadFile, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os, shutil

router = APIRouter()
UPLOAD_DIR = os.path.join(os.getcwd(), "public", "pdf")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")

async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "Solo se permiten archivos PDF"}

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"success": True, "path": f"/pdf/{file.filename}"}
