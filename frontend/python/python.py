from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo import MongoClient
import pandas as pd

uri = "mongodb+srv://onurkagan999:qwerdf1234@cluster0.pfrndcu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))


db = client['gamequiz']
collection = db['games']

# CSV dosyasını okuma
df = pd.read_csv('C:/Users/Administrator/Downloads/vgsales.csv')

# Verileri MongoDB'ye yükleme
data = df.to_dict(orient='records')
collection.insert_many(data)