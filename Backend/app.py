from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

comments = [
    "Effortless elegance.",
    "Very editorial.",
    "Quiet luxury energy.",
    "Chic, polished, and intentional.",
    "The silhouette is working beautifully.",
    "Minimal, refined, and stylish."
]

@app.route("/")
def home():
    return "ÉLAN backend running"

@app.route("/rate", methods=["POST"])
def rate():
    if "image" not in request.files:
        return jsonify({"error": "No image"}), 400

    score = random.choice([8, 8.5, 9, 9.5, 10])
    comment = random.choice(comments)

    return jsonify({
        "score": score,
        "comment": comment
    })

if __name__ == "__main__":
    app.run(debug=True)