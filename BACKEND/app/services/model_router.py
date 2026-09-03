from .ollama_service import (
    generate_answer,
    generate_code_answer,
)


def detect_question_type(question: str) -> str:

    q = question.lower().strip()

    # ==========================================
    # CODE DETECTION
    # ==========================================

    code_keywords = [
        "debug",
        "debugging",
        "fix code",
        "fix this code",
        "find error",
        "error in my code",
        "code error",
        "syntax error",
        "runtime error",
        "exception",
        "traceback",
        "python",
        "javascript",
        "typescript",
        "java",
        "c++",
        "c#",
        "react",
        "nodejs",
        "function",
        "class",
        "variable",
        "algorithm",
        "program",
        "compile",
        "compiler",
        "stack trace",
        "bug",
        "issue in code",
    ]

    for keyword in code_keywords:

        if keyword in q:
            return "code"


    # ==========================================
    # GENERAL
    # ==========================================

    return "general"


def route_question(question: str):

    question_type = detect_question_type(
        question
    )


    # ==========================================
    # CODE MODEL
    # ==========================================

    if question_type == "code":

        answer = generate_code_answer(
            question
        )

        return {

            "type": "code",

            "model":
                "qwen2.5-coder:7b",

            "answer":
                answer,

            "sources":
                []

        }


    # ==========================================
    # GENERAL MODEL
    # ==========================================

    answer = generate_answer(
        question
    )

    return {

        "type": "general",

        "model":
            "llama3.1:8b",

        "answer":
            answer,

        "sources":
            []

    }