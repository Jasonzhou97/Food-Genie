# app.py
from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set your OpenAI API key here
openai.api_key = 'sk-proj-zzfjpv3CYYFoImHSXs95T3BlbkFJu8m66GEiHTfdTi2UL879'

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    favorites = data.get('favorites')
    print(favorites)
    if not favorites:
        return jsonify({"error": "No favorites provided"}), 400

    try:
        
        prompt = f"Based on these favorite restaurants: {favorites}, recommend some new restaurants."
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=100,
        )

        recommendations = response.choices[0].text.strip().split('\n')
        return jsonify({"recommendations": recommendations})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
