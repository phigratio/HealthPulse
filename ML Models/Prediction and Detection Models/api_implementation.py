# -*- coding: utf-8 -*-
"""
Created on Sun Sep  1 00:46:23 2024

@author: 46762
"""

import json 
import requests


url='http://127.0.0.1:8000/diabetes_prediction'

input_data_for_model={
    'Pregnancies' : 6,
    'Glucose'    : 148,
    'BloodPressure' : 72,
    'SkinThickness' : 35,
    'Insulin' : 0,
    'BMI' : 33.6,
    'DiabetesPedigreeFunction' : 0.627,
    'Age' : 50
    }


input_json=json.dumps(input_data_for_model)
print("Starting the request...")

try:
    response = requests.post(url, data=input_json, timeout=5)
    print(f"Request completed with status code: {response.status_code}")
    print(f"Response Text: {response.text}")
except requests.exceptions.Timeout:
    print("The request timed out")
except requests.exceptions.RequestException as e:
    print(f"An error occurred: {e}")


