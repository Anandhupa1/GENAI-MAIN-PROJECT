import os
from qdrant_client import models, QdrantClient
from sentence_transformers import SentenceTransformer
from flask import Flask,jsonify,request
from dotenv import load_dotenv
from flask_cors import CORS
encoder = SentenceTransformer('all-MiniLM-L6-v2')
qdrant = QdrantClient(
    url=os.getenv("QDRANT_HOST"),
    api_key= os.getenv("QDRANT_API_KEY")
)


app = Flask(__name__)
CORS(app)

@app.route('/search',methods=["post"])
def search():
    
    
    # Find all recipes and return only the 'name' and 'type' fields
    # external_api_url = 'http://localhost:3000/api/data'
    # # Sending GET request to the external API
    # response = requests.get(external_api_url)

    # Checking if the request was successful (HTTP Status Code 200)
    # if response.status_code == 200:
    #     # Returning the JSON data received from the API
    #     documents =response.json();
    #     qdrant.recreate_collection(
	#          collection_name="my_books",
	#          vectors_config=models.VectorParams(
	# 	     size=encoder.get_sentence_embedding_dimension(), # Vector size is defined by used model
	# 	     distance=models.Distance.COSINE
	#                                            )
    #                             )
    #     qdrant.upload_records(
	#        collection_name="my_books",
	#        records=[
	# 	   models.Record(
	# 		id=idx,
	# 		vector=encoder.encode(doc["description"]+doc["name"]+doc["instructions"]).tolist(),
	# 		payload=doc
	# 	    ) for idx, doc in enumerate(documents)
	#       ]     
    #         )
    data = request.get_json()
    q = data.get('query', '')
    if q :
        print(q)
        hits = qdrant.search(
          	collection_name="my_books",
          	query_vector=encoder.encode(q).tolist(),
          	limit=4
          )
        out =[]
        for hit in hits:

            out.append({"payload":hit.payload,"score":hit.score})
          	
            
        
        
        return jsonify({"message":"success", "data":out}), 200
    else:
        return jsonify({"error": "No query provided"}), 422


@app.route("/")
def home():
    return "Home page"

if __name__ == '__main__':
    app.run(debug=True)

