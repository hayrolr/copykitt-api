from fastapi import FastAPI, HTTPException
from copykitt import generate_branding_snippet, generate_branding_keywords, validate_subject, MAX_INPUT_LENGTH
from mangum import Mangum


app = FastAPI()
handler = Mangum(app)


@app.get("/")
async def read_root():
    return {"Hello": "CopyKitt!",
            "Usage": {"a": "../gen-snippets?subject=your_subject",
                      "b": "../gen-keywords?subject=your_subject",
                      "c": "../gen-snippets-and-keywords?subject=your_subject"
                      },
            "documentation": "../docs"
            }


@app.get("/gen-snippets")
async def generate_snippets(subject: str):
    validate_input_length(subject)
    snippets = generate_branding_snippet(subject)
    return {"snippets": snippets, "keywords": None}


@app.get("/gen-keywords")
async def generate_keywords(subject: str):
    validate_input_length(subject)
    keywords = generate_branding_keywords(subject)
    return {"snippets": None, "keywords": keywords}


@app.get("/gen-snippets-and-keywords")
async def generate_snippets(subject: str):
    validate_input_length(subject)
    snippets = generate_branding_snippet(subject)
    keywords = generate_branding_keywords(subject)
    return {"snippets": snippets, "keywords": keywords}


def validate_input_length(subject: str):
    if not validate_subject(subject):
        raise HTTPException(status_code=400, detail=f"Input is too long. It must be {MAX_INPUT_LENGTH} characters max.")
