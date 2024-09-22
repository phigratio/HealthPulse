# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""


# -*- coding: utf-8 -*-





from fastapi import FastAPI,File, UploadFile
from pydantic import BaseModel
import pickle
import json
import joblib
import tensorflow as tf
import numpy as np
import cv2
import os
from tensorflow.keras.applications import VGG19
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import json

app=FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # React frontend
    "http://127.0.0.1:3000",
    # Add other origins if necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,
    allow_methods=["*"],    # Allow all HTTP methods
    allow_headers=["*"],    # Allow all HTTP headers
)

class model_input(BaseModel):
    
        Pregnancies : int
        Glucose     : int
        BloodPressure : int
        SkinThickness : int
        Insulin : int
        BMI : float
        DiabetesPedigreeFunction : float
        Age : int
        
#loading the saved model
diabetes_model=pickle.load(open('diabetes_model.sav','rb'))

@app.post('/diabetes_prediction')
def diabetes_pred(input_parameters:model_input):
    
    input_data=input_parameters.json()
    input_dictionary=json.loads(input_data)
    
    preg=input_dictionary['Pregnancies']
    glu=input_dictionary['Glucose']
    bp=input_dictionary['BloodPressure']
    skin=input_dictionary['SkinThickness']
    insulin=input_dictionary['Insulin']
    bmi=input_dictionary['BMI']
    dpf=input_dictionary['DiabetesPedigreeFunction']
    age=input_dictionary['Age']
    
    
    input_list=[preg,glu,bp,skin,insulin,bmi,dpf,age]
    
    prediction=diabetes_model.predict([input_list])
    
    if(prediction[0]==0):
        return "The person is not diabetic"
    else:
        return "The person is diabetic"
    
    
    
# Define the input schema for the heart disease model
class HeartDiseaseInput(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

# Load the saved heart disease model
heart_disease_model = joblib.load(open('heart_disease_model.sav', 'rb'))

@app.post('/heart_disease_prediction')
def heartDisease_pred(input_parameters: HeartDiseaseInput):
    # Convert the input data to a dictionary
    input_data = input_parameters.json()
    input_dict = json.loads(input_data)

    # Extract individual feature values
    age = input_dict['age']
    sex = input_dict['sex']
    cp = input_dict['cp']
    trestbps = input_dict['trestbps']
    chol = input_dict['chol']
    fbs = input_dict['fbs']
    restecg = input_dict['restecg']
    thalach = input_dict['thalach']
    exang = input_dict['exang']
    oldpeak = input_dict['oldpeak']
    slope = input_dict['slope']
    ca = input_dict['ca']
    thal = input_dict['thal']

    # Create the feature list for prediction
    input_list = [age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal]

    # Make the prediction using the loaded model
    prediction = heart_disease_model.predict([input_list])

    # Return the result based on the prediction
    if prediction[0] == 0:
        return "The person does not have heart disease"
    else:
        return "The person has heart disease"
    
    
class CalorieInput(BaseModel):
    gender: int
    age: int
    height: int
    weight: int
    duration: int
    heart_rate: int
    body_temp: float

# Load the saved calorie prediction model
calorie_model = joblib.load('calorie_model.joblib')

@app.post('/calorie_prediction')
def calorie_pred(input_parameters: CalorieInput):
    
    input_data = input_parameters.json()
    input_dict = json.loads(input_data)
    
    gender = input_dict['gender']
    age = input_dict['age']
    height = input_dict['height']
    weight = input_dict['weight']
    duration = input_dict['duration']
    heart_rate = input_dict['heart_rate']
    body_temp = input_dict['body_temp']
    
    
    input_list = [gender,age,height,weight,duration,heart_rate,body_temp]

    # Make the prediction using the loaded model
    prediction = calorie_model.predict([input_list])

    if isinstance(prediction, np.ndarray):
      prediction = prediction.tolist()  # Convert numpy array to a Python list
    else:
      prediction = float(prediction)

    # Return the predicted calories burned
    return {"Predicted calories burned": prediction[0]}


# Define list of class names for the skin disease model
class_names = ["Acne", "Eczema", "Atopic", "Psoriasis", "Tinea", "Vitiligo"]

# Load the saved skin disease model
skin_disease_model = tf.keras.models.load_model('6claass.h5')
# Define the VGG19 model
vgg_model = VGG19(weights='imagenet', include_top=False, input_shape=(180, 180, 3))

def preprocess_image(image_path):
    """Preprocesses the image for prediction"""
    img = cv2.imread(image_path)
    img = cv2.resize(img, (180, 180))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    img = vgg_model.predict(img)
    img = img.reshape(1, -1)  # Add batch dimension
    return img


@app.post('/skin_disease_prediction')
async def predict_skin_disease(file: UploadFile = File(...)):
    """
    Predict skin disease from an uploaded image file.
    """
    try:
        # Ensure the temp_images directory exists
        temp_dir = "temp_images"
        os.makedirs(temp_dir, exist_ok=True)

       # Save the uploaded file temporarily
        file_location = os.path.join(temp_dir, file.filename)
        with open(file_location, "wb") as f:
          f.write(await file.read())

        # Preprocess the image
        img = preprocess_image(file_location)
        # Make prediction
        prediction = skin_disease_model.predict(img)[0]
        predicted_class_index = np.argmax(prediction)
        predicted_class_name = class_names[predicted_class_index]
        # Check the model summary to confirm the input shape
        print(skin_disease_model.summary())

        # Remove the temporary file
        os.remove(file_location)
        
        # Return the predicted class
        return {"Predicted skin disease": predicted_class_name}

    except Exception as e:
        return {"error": str(e)}
    


# Load pre-trained model and symptom data
model = joblib.load("symptom.joblib")
df1 = pd.read_csv("Symptom-severity.csv")  # Load the symptom severity dataset
discrp = pd.read_csv("symptom_Description.csv")  # Symptom description dataset
ektra7at = pd.read_csv("symptom_precaution.csv")  # Precaution dataset

# Create FastAPI app instance
app = FastAPI()

# Define request body structure using Pydantic
class SymptomInput(BaseModel):
    symptoms: list

# Utility function for symptom to weight mapping
def get_symptom_weights(symptoms_list):
    symptoms = np.array(df1["Symptom"])
    weights = np.array(df1["weight"])
    psymptoms = []
    
    for symptom in symptoms_list:
        for i in range(len(symptoms)):
            if symptom == symptoms[i]:
                psymptoms.append(weights[i])
                break
        else:
            psymptoms.append(0)  # Assign weight 0 if symptom not found
    return np.array(psymptoms).reshape(1, -1)

# API route for model prediction
@app.post("/symptom_predict")
def predict_disease(symptom_input: SymptomInput):
    symptoms_list = symptom_input.symptoms
    # Convert symptoms to weights
    input_data = get_symptom_weights(symptoms_list)
    
    # Make prediction
    prediction = model.predict(input_data)[0]
    
    # Get disease description and precautions
    description = discrp[discrp['Disease'] == prediction].values[0][1]
    precautions = ektra7at[ektra7at['Disease'] == prediction].iloc[:, 1:].values[0].tolist()
    
    return {
        "disease": prediction,
        "description": description,
        "precautions": precautions
    }

