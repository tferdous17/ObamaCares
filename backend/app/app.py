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
import os
from flask import Flask
from generate import runner as generateReelRunner
from generate import model as generateScript
from os import path, mkdir, system
from shutil import rmtree
from flask_cors import CORS
from topics_to_prompts import topics_to_prompts

import random
from flask import jsonify


REEL_COUNT = 5

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Allow only localhost:3000

@app.route('/')
def test():
    return 'Hello world'

@app.route('/api/reels/<reel_topic>', methods=['GET'])
def getReel(reel_topic):
    # fetch the list of generated videos for this particular topic, display on frontend in reel format
    if reel_topic not in topics_to_prompts:
        return jsonify(message="Something went wrong"), 400

    prompts = topics_to_prompts.get(reel_topic, None)
    if prompts is None:
        prompts = None
        # fetch some shit based on reel topic
    print(f'len of prompts=${len(prompts)}')
    for i in range(REEL_COUNT):
        print(i)
        script = generateScript(prompts[i])
        generateReelRunner(
            script,
            random.randint(1,3),
            1, # obama voice?
            random.randint(1,4), # obama img
            1,
            1,
            random.randint(1,5),
            random.randint(1,6)
        )

@app.route('/api/reels/generate/status/<reel_id>', methods=['GET'])
def fetchStatusOfReelGeneration(reel_id):
    pass


TOPICS_DIR = "../../frontend/src/videos"  # Directory where topic folders are stored

@app.route('/api/topics', methods=['GET'])
def getTopics():
    try:
        topics = [folder for folder in os.listdir(TOPICS_DIR) if os.path.isdir(os.path.join(TOPICS_DIR, folder))]
        formatted_topics = [topic.capitalize() for topic in topics]
        return jsonify(formatted_topics)  # Using jsonify correctly
    except Exception as e:
        return jsonify(message=str(e)), 500  # Corrected use of jsonify


def setup():
    if path.exists("tmp") :
          rmtree("tmp")
          mkdir("tmp")
    else :
          mkdir("tmp")

if __name__ == '__main__':
    setup()
    app.run(debug=True)
# if time add "create your own ting"