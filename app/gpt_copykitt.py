import json
import argparse
import re
from typing import List
from openai import OpenAI

MAX_INPUT_LENGTH = 32


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args();
    user_input = args.input

    print(f"User input: {user_input}")
    if len(user_input) <= MAX_INPUT_LENGTH:
        generate_branding_snippet(user_input)
        generate_branding_keywords(user_input)
    else:
        raise ValueError(f"Input length exceed the max allowed ({MAX_INPUT_LENGTH}).")


def generate_branding_snippet(subject: str) -> str:
    client = OpenAI()
    prompt = f"Generate upbeat branding snippet for {subject}"
    print(prompt)
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
    except Exception as error:
        message = error.args[0]
        message = message[18:].replace('None', '"None"').replace("'", '"')
        json_dict = json.loads(message)
        error_message = f"An exception occurred: {type(error).__name__} - {json_dict['error']['message']}"

    if (error_message):
        branding_text = error_message
    else:
        branding_text = completion.choices[0].message

    branding_text = branding_text.strip()

    if branding_text[-1] not in {".","!","?"}:
        branding_text += "..."
    
    print(f"Snippet: {branding_text}")
    return branding_text


def generate_branding_keywords(subject: str) -> List[str]:
    client = OpenAI()
    prompt = f"Generate related branding keywords for {subject}"
    print(prompt)
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
    except Exception as error:
        message = error.args[0]
        message = message[18:].replace('None', '"None"').replace("'", '"')
        json_dict = json.loads(message)
        error_message = f"An exception occurred: {type(error).__name__} - {json_dict['error']['message']}"

    if (error_message):
        keywords_text = error_message
    else:
        keywords_text = completion.choices[0].message

    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|-|\s+", keywords_text)
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]
    
    print(f"Keywords: {keywords_array}")
    return keywords_array


if __name__ == "__main__":
    main()
