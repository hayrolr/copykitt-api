from openai import OpenAI
import json

client = OpenAI()

subject = "cofee"
prompt = f"Generate upbeat branding snippet for {subject}"

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
    print("Error: ", error_message)
else:
    print("Completion[0]: ", completion.choices[0].message)