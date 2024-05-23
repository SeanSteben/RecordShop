from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load the model from disk
with open('model_pipeline.pkl', 'rb') as file:
    model = pickle.load(file)
#change to use with preprocessor pickle
with open('preprocessor.pkl', 'rb') as file:
    unpickled_preprocessor = pickle.load(file)
    
#fetch localhost 5000
@app.route('/api/predict', methods=['POST'])
def predict():
    # Get the request data
    
    data = request.get_json(force=True)
    next_album = pd.DataFrame({
    'genre': ['Jazz'],
    'band_name' : ['Dilemma'],
    'num_sold': [45]
    display(data)
    
})
    
    #FIGURE OUT FROM DATA VARIABLE find structure od data

     # Ensure the data is a list (even if it's just one dictionary)
    if isinstance(data, dict):
        data = [data]

    #from jupyter 
    prediction_encoded = unpickled_preprocessor.transform(next_album)
    print(prediction_encoded)
    # Make a prediction
    #prediction = model.predict(pd.DataFrame(prediction_encoded))

    # Return the prediction
    return jsonify({})

if __name__ == '__main__':
    app.run(port=5000)
