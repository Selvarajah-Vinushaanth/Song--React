from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow requests from React

# Load model once
model_path = "Vinushaanth/metaphor-classifier"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSequenceClassification.from_pretrained(model_path)
model.eval()

def predict_metaphor(texts):
    """Run batch or single text prediction"""
    if isinstance(texts, str):
        texts = [texts]

    inputs = tokenizer(texts, return_tensors="pt", truncation=True, padding=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=-1).cpu().numpy()
    results = []
    for i, text in enumerate(texts):
        pred = int(np.argmax(probs[i]))
        label = "Metaphor" if pred == 1 else "Literal"
        confidence = float(probs[i][pred])
        results.append({
            "text": text,
            "label": label,
            "confidence": confidence
        })
    return results

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    # allow multi-line input
    sentences = [s.strip() for s in text.split("\n") if s.strip()]
    results = predict_metaphor(sentences)

    # stats for frontend
    total = len(results)
    metaphor_count = sum(1 for r in results if r["label"] == "Metaphor")
    literal_count = total - metaphor_count
    avg_conf = np.mean([r["confidence"] for r in results]) if total > 0 else 0
    high_conf_count = sum(1 for r in results if r["confidence"] > 0.85)

    stats = {
        "total_sentences": total,
        "metaphor_count": metaphor_count,
        "literal_count": literal_count,
        "average_confidence": avg_conf,
        "high_confidence_count": high_conf_count
    }

    return jsonify({"results": results, "stats": stats})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
