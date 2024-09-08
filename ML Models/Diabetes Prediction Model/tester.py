from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the model
model = joblib.load('calorie_model.joblib')

@app.route('/predict_calories', methods=['POST'])
def predict_calories():
    data = request.json  # Expecting input data in JSON format
    # Assuming input data is in the form of a list or similar structure
    input_data = np.array(data['features']).reshape(1, -1)  # Reshape for prediction
    
    # Make prediction
    prediction = model.predict(input_data)
    
    # Return the prediction as a JSON response
    return jsonify({'calories_burnt': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
