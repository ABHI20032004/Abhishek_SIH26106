from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..services.rag_service import ask_pdf_question
from ..services.model_router import route_question


router = APIRouter(
    prefix="/api/chat",
    tags=["AI Chat"]
)


class ChatRequest(BaseModel):
    message: str
    use_pdf: bool = False


@router.post("")
def chat(request: ChatRequest):

    question = request.message.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty"
        )

    try:

        # =========================================
        # PDF MODE
        # =========================================

        if request.use_pdf:

            result = ask_pdf_question(
                question
            )

            return {
                "success": True,
                "type": "pdf",
                "model": "llama3.1:8b",
                "answer": result["answer"],
                "sources": result["sources"]
            }


        # =========================================
        # AUTOMATIC MODEL ROUTING
        # =========================================

        result = route_question(
            question
        )

        return {
            "success": True,
            "type": result["type"],
            "model": result["model"],
            "answer": result["answer"],
            "sources": result["sources"]
        }


    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )