import json
import re

from .ollama_service import generate_inspection_answer
from .chroma_service import collection


def get_document_chunks(
    document_id: int
):

    results = collection.get(
        where={
            "document_id": str(document_id)
        }
    )

    documents = results.get(
        "documents",
        []
    )

    metadatas = results.get(
        "metadatas",
        []
    )

    chunks = []

    for index, text in enumerate(documents):

        metadata = (
            metadatas[index]
            if index < len(metadatas)
            else {}
        )

        chunks.append({

            "text": text,

            "page_number":
                metadata.get(
                    "page_number"
                ),

            "filename":
                metadata.get(
                    "filename",
                    ""
                )
        })

    return chunks


def build_inspection_prompt(
    chunks
):

    context_parts = []

    for chunk in chunks:

        context_parts.append(
            f"""
PAGE {chunk["page_number"]}

{chunk["text"]}
"""
        )

    context = "\n".join(
        context_parts
    )

    return f"""
You are an industrial safety inspection AI.

Analyze the following inspection document.

Identify safety, compliance, operational,
environmental, electrical, fire, machinery,
or other relevant inspection issues.

Only identify issues supported by the document.

Return ONLY valid JSON.

Required JSON format:

{{
  "risk_level": "LOW",
  "compliance_score": 85,
  "findings": [
    {{
      "title": "Short finding title",
      "description": "Detailed description",
      "category": "Safety",
      "severity": "HIGH",
      "recommendation": "Recommended corrective action",
      "page_number": 1,
      "source_document": "filename.pdf"
    }}
  ]
}}

Rules:

- risk_level must be LOW, MEDIUM, HIGH or CRITICAL.
- compliance_score must be between 0 and 100.
- severity must be LOW, MEDIUM, HIGH or CRITICAL.
- page_number must refer to the source document.
- Do not invent facts.
- If there are no findings, return an empty findings array.

DOCUMENT:

{context}
"""


def extract_json(
    response
):

    response = response.strip()

    # Remove markdown fences

    response = re.sub(
        r"```json",
        "",
        response,
        flags=re.IGNORECASE
    )

    response = re.sub(
        r"```",
        "",
        response
    )

    response = response.strip()

    # Find JSON object

    start = response.find("{")
    end = response.rfind("}")

    if start == -1 or end == -1:

        raise ValueError(
            "AI did not return valid JSON"
        )

    return json.loads(
        response[start:end + 1]
    )


def analyze_inspection(
    inspection_id: int,
    document_id: int
):

    chunks = get_document_chunks(
        document_id
    )

    if not chunks:

        raise ValueError(
            "No indexed chunks found for the inspection PDF"
        )

    prompt = build_inspection_prompt(
        chunks
    )

    response = generate_inspection_answer(
        prompt
    )

    result = extract_json(
        response
    )

    return result