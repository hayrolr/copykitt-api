import os
import re
# import json
import argparse
import google.generativeai as genai
from typing import List


MAX_INPUT_LENGTH = 32
MODEL_CONFIG = {
  "temperature": 1,
  "top_p": 0.99,
  "top_k": 0,
  "max_output_tokens": 1024,
}
genai.configure(api_key=os.environ["API_KEY"])


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args();
    user_input = args.input

    print(f"User input: {user_input}")
    if validate_subject(user_input):
        generate_branding_snippet(user_input)
        generate_branding_keywords(user_input)
    else:
        raise ValueError(f"Input length exceed the max allowed ({MAX_INPUT_LENGTH}).")


def generate_branding_snippet(subject: str) -> str:
    response = None
    error_message = None
    model = genai.GenerativeModel('gemini-1.5-flash-latest', generation_config=MODEL_CONFIG)
    prompt = f"\n\nGenerate upbeat branding snippet for {subject}"
    print(prompt)
    try:
        response = model.generate_content(prompt)
    except Exception as error:
        error_message = error.args[0]

    if response:
        branding_text = response.text
    else:
        branding_text = error_message
    
    branding_text = branding_text.strip()

    # if branding_text[-1] not in {".","!","?"}:
    #     branding_text += "..."
    
    print(f"Snippet: {branding_text}")
    return branding_text


def generate_branding_keywords(subject: str) -> List[str]:
    response = None
    error_message = None
    model = genai.GenerativeModel('gemini-1.5-flash-latest', generation_config=MODEL_CONFIG)
    prompt = f"\n\nGenerate related branding keywords for {subject}"
    print(prompt)
    try:
        response = model.generate_content(prompt)
    except Exception as error:
        error_message = error.args[0]

    if response:
        keywords_text = response.text
    else:
        keywords_text = error_message

    keywords_text = keywords_text.strip()

    # keywords_array = re.split(",|\n|;|-", keywords_text)
    # keywords_array = [k.lower().strip() for k in keywords_array]
    # keywords_array = [k for k in keywords_array if len(k) > 0]
    
    # print(f"Keywords: {keywords_array}")
    # return keywords_array

    if keywords_text[-1] not in {".","!","?"}:
        keywords_text += "..."
    
    print(f"Keywords: {keywords_text}")
    return keywords_text

def validate_subject(subject: str) -> bool:
    return len(subject) <= MAX_INPUT_LENGTH


if __name__ == "__main__":
    main()
