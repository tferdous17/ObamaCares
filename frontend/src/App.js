import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
// import BottomNavbar from './components/BottomNavbar';
import TopNavbar from "./components/TopNavbar";

const randomUsers = [
  {
    profilePic: "https://i.pravatar.cc/100?img=1",
    username: "coolcoder99",
  },
  {
    profilePic: "https://i.pravatar.cc/100?img=2",
    username: "devmaster",
  },
  {
    profilePic: "https://i.pravatar.cc/100?img=3",
    username: "ai_guru",
  },
  {
    profilePic: "https://i.pravatar.cc/100?img=4",
    username: "techgenius",
  },
  {
    profilePic: "https://i.pravatar.cc/100?img=5",
    username: "booter",
  },
  {
    profilePic: "https://i.pravatar.cc/100?img=6",
    username: "dudeyloo",
  },
];

const importVideos = (category) => {
  try {
    const context = require.context("./videos", true, /\.mp4$/);
    return context
      .keys()
      .filter((file) => file.includes(`${category}/`)) // Filter only the selected category
      .map((file, index) => ({
        url: context(file),
        username: `${randomUsers[index].username}`,
        profilePic: `https://randomuser.me/api/portraits/thumb/men/${index}.jpg`,
        description: ` #${index + 1}`,
        song: "Original Sound - Random",
        likes: Math.floor(Math.random() * 10000),
        comments: Math.floor(Math.random() * 500),
        saves: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
      }));
  } catch (error) {
    console.error(`Error loading videos for category ${category}:`, error);
    return [];
  }
};

function Outer({ setHide, category, setCat }) {
  const [pop, setPop] = useState(false);
  const [topics, setTopics] = useState([]);
  const [inputTxt, setInputTxt] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/topics") // Backend URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTopics(data))
      .catch((error) => console.error("Error fetching topics:", error));
  }, [pop]);
  // Capitalize first letter of each topic
  const formattedTopics = topics.map(
    (topic) => topic.charAt(0).toUpperCase() + topic.slice(1)
  );

  return (
    <div className="outer">
      <div className="cornerText">
        <p>ObamaCares</p>
        <button onClick={() => setHide(false)} className="xButton">
          X
        </button>
      </div>
      <div className="inner">
        <p className="title"> Select a topic</p>
        <div className="cards">
          {!pop ? (
            formattedTopics.map((topic) => (
              <button
                key={topic}
                className={`${
                  category === topic.toLowerCase() ? "cardActive" : ""
                } card`}
                onClick={() => setCat(topic.toLowerCase())}
              >
                <p>{topic}</p>
              </button>
            ))
          ) : (
            <input
              onChange={(e) => setInputTxt(e.target.value)}
              value={inputTxt}
              placeholder="new topic"
              className="newTopic"
            ></input>
          )}
          <div>
            <button
              className={`card`}
              onClick={() => {
                setPop(!pop);

                if (pop) {
                  console.log("submit");
                  if (inputTxt.trim()) {
                    // Send inputTxt to the backend to add the new topic
                    fetch("http://127.0.0.1:5000/api/topics", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        new_topic: inputTxt.toLowerCase(),
                      }),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log("Topic added:", data);
                        setPop(false); // Close the input field after submission
                        setInputTxt(""); // Clear the input field
                      })
                      .catch((error) =>
                        console.error("Error submitting topic:", error)
                      );
                  }
                }
                setInputTxt("");
              }}
            >
              <p>+</p>
            </button>
          </div>
        </div>
      </div>
      <p className="bottomMessage">
        Enhancing medical literacy one reel at a time
      </p>
    </div>
  );
}

function App() {
  const [videos, setVideos] = useState([]);
  const [category, setCategories] = useState("stress");
  const [hide, setHide] = useState(true);
  const videoRefs = useRef([]);

  // useEffect(() => {
  //   setVideos(videoUrls);
  // }, []);

  useEffect(() => {
    videoRefs.current = []; // Reset refs before updating videos
    setVideos(importVideos(category));
  }, [category]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    }, observerOptions);

    // Ensure only valid elements are observed
    const validRefs = videoRefs.current.filter((ref) => ref instanceof Element);
    validRefs.forEach((videoRef) => observer.observe(videoRef));

    return () => observer.disconnect();
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index) => (ref) => {
    if (ref) {
      videoRefs.current[index] = ref;
    }
  };

  return (
    <div className="app">
      {hide && (
        <Outer setHide={setHide} category={category} setCat={setCategories} />
      )}
      <div className="container">
        <TopNavbar setHide={setHide} className="top-navbar" />
        {/* Here we map over the videos array and create VideoCard components */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
          />
        ))}
        {/* <BottomNavbar className="bottom-navbar" /> */}
      </div>
    </div>
  );
}

export default App;
