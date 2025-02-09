'''
Backend Endpoints

Reels:
    POST /api/reels/generate
        - should pass in topic in the body so we know which one to generate
    GET /api/reels/generate/status/{reel_id}
    GET /api/reels/{reel_id}

Medical Topics
    GET /api/topics


'''
from flask import Flask

app = Flask(__name__)

@app.route('/api/reels/generate', methods=['POST'])
def generateReel():
    return 'Hello, World!'

@app.route('/api/reels/generate/status/<reel_id>', methods=['GET'])
def fetchStatusOfReelGeneration(reel_id):
    pass

@app.route('/api/reels/<reel_id>', methods=['GET'])
def getReel(reel_id):
    pass