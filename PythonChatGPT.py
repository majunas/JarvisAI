import os
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

#Creates web app and imports all required packages for the backend to communicate to the frontend 

app = Flask(__name__)
CORS(app)

#boots flask app and CORS

openai.api_key = "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"
[]
#I should remove hardcoded API key - Security issue

@app.route("/oxfordjarvis", methods=["POST", "OPTIONS"])
def chat():

#

    if request.method == "OPTIONS":
            return jsonify({"status": "OK"}), 200
    
#

    data = request.get_json(    )
    user_message = data.get("message", "").strip()

#

    if not user_message:
         return jsonify({"error": "Please state your query..."}), 400
    
#Errors no msg typed

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
                messages=[
                {"role": "system", "content": "You are an IT support chatbot named Jarvis and you have a professional, helpful personality. You work for Oxford Products."},
                {"role": "user", "content": user_message}
            ]
        )

#processes message using OpenAi, with gpt-4o-mini and defines the role of Jarvis

        chatbot_reply = response["choices"][0]["message"]["content"].strip()
        return jsonify({"reply": chatbot_reply})

    except openai.error.OpenAIError as e:
        return jsonify({"error": f"OpenAI API error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
