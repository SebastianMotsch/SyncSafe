from flask import Flask, request, jsonify
from transformers import pipeline
import torch

app = Flask(__name__)

model_id = "vanessasml/cyber-risk-llama-3-8b"
pipeline_model = pipeline(
    "text-generation",
    model=model_id,
    model_kwargs={"torch_dtype": torch.bfloat16}, 
    device= -1,  #Changed from cuda
)

@app.route('/detect-vulnerabilities', methods=['POST'])
def detect_vulnerabilities():
    device_data = request.json.get('device_data', '')

    if not device_data:
        return jsonify({"error": "Device data is required."}), 400

    
    example_prompt = f"""Question: Identify any potential vulnerabilities in the following device data and explain why:

    {device_data}
    """
    
    
    outputs = pipeline_model(
        example_prompt,
        max_new_tokens=500,  
        do_sample=True,      
        temperature=0.1,     
        top_p=0.9,           
    )
    
    
    generated_text = outputs[0]["generated_text"]
    
    
    return jsonify({"vulnerabilities": generated_text})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
