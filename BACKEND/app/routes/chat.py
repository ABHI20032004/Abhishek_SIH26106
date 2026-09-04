from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..services.model_router import route_question


router = APIRouter(
    prefix="/api/chat",
    tags=["AI Chat"]
)


class ChatRequest(BaseModel):

    message: str

    # Optional manual override.
    # Examples:
    # "general"
    # "code"
    # "pdf"
    # "ocr"
    mode:  None = None

    # Context information
    # sent by frontend when files are available
    has_pdf: bool = False
    has_image: bool = False


@router.post("")
def chat(request: ChatRequest):

    question = request.message.strip()

    if not question:

        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty"
        )

    try:

        # =================================================
        # AUTOMATIC MODEL ROUTING
        # =================================================

        result = route_question(

            question,

            has_pdf=request.has_pdf,

            has_image=request.has_image,

            requested_mode=request.mode
        )


        return {

            "success": True,

            "type":
                result["type"],

            "model":
                result["model"],

            "answer":
                result["answer"],

            "sources":
                result.get(
                    "sources",
                    []
                ),

            "routing_reason":
                result.get(
                    "routing_reason",
                    ""
                )
        }


    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )