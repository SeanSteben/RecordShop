from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd


app = Flask(__name__)
CORS(app)
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
    
    data = request.get_json(force=True)#cconatins everything that has been 
    next_album = pd.DataFrame({
    'genre': [data["genre"]],
    'band_name' :[data["band_name"]],
    'num_sold': [45]
    })
#     next_album = pd.DataFrame({
#     'genre': ['Jazz'],
#     'band_name' : ['Dilemma'],
#     'num_sold': [45]
    
# })

    #print( data)
    #FIGURE OUT FROM DATA VARIABLE find structure od data

     # Ensure the data is a list (even if it's just one dictionary)
    if isinstance(next_album, dict):
        next_album = [next_album]

    #from jupyter 
    next_album_encoded = unpickled_preprocessor.transform(next_album)

    predicted = model.predict(next_album_encoded)
    print("Reccomended album for you is: ", predicted[0])

    # Return the prediction
    return jsonify(predicted.tolist())

if __name__ == '__main__':
    app.run(port=5000)
