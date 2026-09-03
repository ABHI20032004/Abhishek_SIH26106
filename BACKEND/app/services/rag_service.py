from .ollama_service import (
    create_embedding,
    generate_answer
)

from .chroma_service import (
    search_chunks
)


def ask_pdf_question(
    question: str,
    top_k: int = 5
):

    # --------------------------------
    # 1. Convert question to embedding
    # --------------------------------

    query_embedding = create_embedding(
        question
    )


    # --------------------------------
    # 2. Search ChromaDB
    # --------------------------------

    results = search_chunks(
        query_embedding,
        top_k
    )


    if not results:

        return {
            "answer": (
                "I could not find any "
                "relevant information in "
                "the uploaded documents."
            ),
            "sources": []
        }


    documents = results.get(
        "documents",
        [[]]
    )[0]

    metadatas = results.get(
        "metadatas",
        [[]]
    )[0]


    # --------------------------------
    # 3. Build context
    # --------------------------------

    context_parts = []

    sources = []

    for document, metadata in zip(
        documents,
        metadatas
    ):

        filename = metadata.get(
            "filename",
            "Unknown"
        )

        page_number = metadata.get(
            "page_number",
            "Unknown"
        )

        context_parts.append(

            f"Source: {filename}, "
            f"Page: {page_number}\n"
            f"{document}"

        )

        sources.append({

            "filename": filename,

            "page_number": page_number

        })


    context = "\n\n".join(
        context_parts
    )


    # --------------------------------
    # 4. Ask Llama
    # --------------------------------

    prompt = f"""
You are an industrial inspection AI assistant.

Answer the user's question using ONLY
the information provided in the document
context below.

If the answer is not present in the
documents, clearly say that the
information was not found.

Do not invent facts.

User question:
{question}

Document context:
{context}

Provide a clear and professional answer.
"""


    answer = generate_answer(
        prompt
    )


    return {

        "answer": answer,

        "sources": sources

    }