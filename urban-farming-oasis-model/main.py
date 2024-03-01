from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
from openai import OpenAI
import os
import io

from xml.etree import ElementTree as ET

# os.environ['OPENAI_API_KEY'] = "<Your OPENAI_API_KEY>"

client = OpenAI()

app = Flask(__name__)
model = tf.keras.models.load_model('soil_model.h5')

SOIL_CLASS = {
    0: "Alluvial Soil",
    1: "Black Soil",
    2: "Clay Soil",
    3: "Red Soil",
  }

def preprocess_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image = np.asarray(image)
    image = np.expand_dims(image, axis=0)
    return image

def convert_xml_to_json(xml_data):
    # Parse the XML data
    root = ET.fromstring(xml_data)

    # Initialize a dictionary to hold the JSON structure
    json_data = {}

    # Iterate through each child of the root
    for child in root:
        if child.tag == "soil_description":
            json_data["soil_description"] = child.text.strip()
        elif child.tag == "crops":
            crops_list = []
            for crop in child:
                crop_dict = {"crop_name": None, "reason": None, "examples": []}
                for element in crop:
                    if element.tag == "crop_name":
                        crop_dict["crop_name"] = element.text.strip()
                    elif element.tag == "reason":
                        crop_dict["reason"] = element.text.strip()
                    elif element.tag == "examples":
                        examples = [example.text.strip() for example in element]
                        crop_dict["examples"] = examples
                crops_list.append(crop_dict)
            json_data["crops"] = crops_list

    return json_data

def get_recommendation(soil_type:str):
    completion = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {"role": "system", "content": "You are an expert in urban farming, skilled in providing crops recommendation based on the type of soil and the geographical traits in urban settings."},
            {"role": "user", "content": f"Recommend me not more than 4 crops to grow if I have {soil_type} and based in Malaysia, types of crops that can be farmed in indoor limited spaces is preferred. Output in this format as so: <response><soil_description>[short description of the type of soil]</soil_description><crops><crop><crop_name>[name of the crop]</crop_name><reason>[reason]</reason><examples><example>[example of the crop]</example><example>[example of the crop]</example></examples></crop></crops></response>"}
        ]
    )

    return convert_xml_to_json(completion.choices[0].message.content)


@app.route('/predict_soil', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        image = Image.open(io.BytesIO(file.read()))
        processed_image = preprocess_image(image, target_size=(244, 244))

        prediction = model.predict(processed_image).tolist()

        class_predicted = SOIL_CLASS[prediction[0].index(max(prediction[0]))]
        
        # print(class_predicted)

        recommendation = get_recommendation(class_predicted)

        # print(recommendation)

        response =  jsonify({"soil_type": class_predicted, **recommendation})
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response

if __name__ == '__main__':
    app.run(debug=True)
