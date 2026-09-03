from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models

from .routes.documents import router as documents_router
from .routes.chat import router as chat_router


# =====================================================
# CREATE DATABASE TABLES
# =====================================================

Base.metadata.create_all(bind=engine)


# =====================================================
# FASTAPI APP
# =====================================================

app = FastAPI(
    title="InspectAI",
    description="Offline Industrial Inspection AI",
    version="1.0.0"
)


# =====================================================
# CORS
# =====================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =====================================================
# ROUTES
# =====================================================

app.include_router(
    documents_router
)

app.include_router(
    chat_router
)


# =====================================================
# BASIC ROUTES
# =====================================================

@app.get("/")
def root():

    return {
        "message": "InspectAI API is running",
        "status": "online"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }