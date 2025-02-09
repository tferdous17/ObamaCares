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
import shutil
from flask import request
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

@app.route('/api/topics', methods=['POST'])
def addTopic():
    try:
        data = request.get_json()  # Get the JSON payload
        print(data)
        new_topic = topics_to_prompts.get(data.get('new_topic'), None)  # Extract the new topic
        if not new_topic:
            print('new topic')
            # create new topic
            pass

        for i in range(REEL_COUNT):
            print(i)
            script = generateScript(new_topic[i])
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

        video_folder = "./video" 
        if os.path.exists(video_folder):
            print("Video folder exists.")
            new_folder = f"../../frontend/src/videos/{data.get('new_topic')}"
            if not os.path.exists(new_folder):
                    os.makedirs(new_folder)
                    print(f"Created new folder: {new_folder}")

            for filename in os.listdir(video_folder):
                file_path = os.path.join(video_folder, filename)
                if os.path.isfile(file_path):  # Ensure it's a file and not a subfolder
                    shutil.move(file_path, os.path.join(new_folder, filename))
                    print(f"Moved {filename} to {new_folder}")
        else:
            print(f"Video folder {video_folder} does not exist.")
        return jsonify(message="Topic added successfully"), 201
        
        # check video folder, then we mae the folder and move them all in.
        
        # Return success message
        return jsonify(message="Topic added successfully"), 201
    except Exception as e:
        return jsonify(message=str(e)), 500

@app.route('/api/reels/<reel_topic>', methods=['GET'])
def getReel(reel_topic):
    # fetch the list of generated videos for this particular topic, display on frontend in reel format
    if reel_topic not in topics_to_prompts:
        return jsonify(message="Something went wrong"), 400

    prompts = topics_to_prompts[reel_topic]
    print(f'len of prompts=${len(prompts)}')
    for i in range(5):
        print(i)
        script = generateScript(prompts[i])
        generateReelRunner(
            script,
            random.randint(1,3),
            random.randint(1,5), # obama voice?
            random.randint(1,4), # obama img
            1,
            1,
            random.randint(1,5),
            random.randint(1,6)
        )
    return 'ok'

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