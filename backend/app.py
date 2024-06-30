from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

recommender = pipeline("text-classification",model="nlptown/bert-base-multilingual-uncased-sentiment")

def recommend():
    data = request.json
    user_favorites = data.get('favorites', [])
    if not user_favorites:
        return jsonify({"error": "No favorites provided"}), 400
    recommendations = recommender(user_favorites)
    formatted_recommendations = [{"label": rec["label"], "score": rec["score"]} for rec in recommendations]

    return jsonify(formatted_recommendations)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)