# urban-farming-oasis-model
This is a Python Flask project developed for hosting the ML model trained for Soil Classification and Crops Recommendation.

The Soil Classification model is adapted from a pre-trained model contributed by Mahmoud Reda ([See him here](https://www.kaggle.com/mahmoudreda55)) in Kaggle.
The reference link to the model notebook is provided [here](https://www.kaggle.com/code/mahmoudreda55/soil-classification/notebook).

For the Crops Recommendation module, we harnesses the power of LLM, in our case the ChatGPT API to recommend types and examples of crops can be farmed in an urban settings. 
The prompt has been specifically designed and tested so that the LLM provide only the relevant information based on the geographical information, indoor farming contraints and other relevant concerns.
The LLM Model we used here is `gpt-4-1106-preview`, the latest review.

Note that this is a prototype and is not a production release. Only the main functions are developed and many more are in progress.

## Run the server locally
All of the development and testing are done on a Windows 10 machine, Python 3.11.
1. To run it locally, you need to have the OpenAI Key to access the ChatGPT API. Refer to this [official documentation](https://help.openai.com/en/articles/4936850-where-do-i-find-my-api-key) to learn how to get one.
Edit the  `main.py` file to fill in your API key.

In `main.py`
```python
os.environ['OPENAI_API_KEY'] = "<Your OPENAI_API_KEY>"
```

2. Install the dependencies, by doing `pip install -r requirements.txt` in command prompt.
3. After the installation, do `python main.py` in command prompt.

The server should be running at `http://localhost:5000` and start listening for incoming requests.

Currently, the only endpoint available is `http://localhost:5000/predict_soil`.

If you do not have the OpenAI API Key, contact me (Davian Lim) via the DevHack Facilitator of Team Ambatukamehameha to get one for testing. 

