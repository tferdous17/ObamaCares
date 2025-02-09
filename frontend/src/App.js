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
    profilePic: "https://i.pravatar.cc/100?img=4",
    username: "booter",
  },
];

const importVideos = (category) => {
  try {
    const context = require.context("./videos", true, /\.mp4$/);
    return context
      .keys()
      .filter((file) => file.includes(`cat${category}/`)) // Filter only the selected category
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
// // This array holds information about different videos
// const videoUrls = [
//   {
//     url: require("./videos/video1.mp4"),
//     profilePic:
//       "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D",
//     username: "csjackie",
//     description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
//     song: "Original sound - Famed Flames",
//     likes: 430,
//     comments: 13,
//     saves: 23,
//     shares: 1,
//   },
//   {
//     url: require("./videos/video2.mp4"),
//     profilePic:
//       "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D",
//     username: "dailydotdev",
//     description:
//       "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
//     song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
//     likes: "13.4K",
//     comments: 3121,
//     saves: 254,
//     shares: 420,
//   },
//   {
//     url: require("./videos/video3.mp4"),
//     profilePic:
//       "https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D",
//     username: "wojciechtrefon",
//     description:
//       "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
//     song: "help so many people are using my sound - Ezra",
//     likes: 5438,
//     comments: 238,
//     saves: 12,
//     shares: 117,
//   },
//   {
//     url: require("./videos/video4.mp4"),
//     profilePic:
//       "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D",
//     username: "faruktutkus",
//     description:
//       "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
//     song: "orijinal ses - Computer Science",
//     likes: 9689,
//     comments: 230,
//     saves: 1037,
//     shares: 967,
//   },
//   {
//     url: require("./videos/video5.mp4"),
//     profilePic:
//       "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D",
//     username: "tasnimFerdous",
//     description: "locked in",
//     song: "afro beats",
//     likes: 1003,
//     comments: 240,
//     saves: 0,
//     shares: 0,
//   },
// ];

function Outer({ setHide, category, setCat }) {
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
          <button
            className={`${category === 0 ? "cardActive" : ""} card`}
            onClick={() => setCat(0)}
          >
            {" "}
            <p>Stress</p>{" "}
          </button>
          <button
            className={`${category === 1 ? "cardActive" : ""} card`}
            onClick={() => setCat(1)}
          >
            {" "}
            <p>Stroke</p>{" "}
          </button>
          <button
            className={`${category === 2 ? "cardActive" : ""} card`}
            onClick={() => setCat(2)}
          >
            {" "}
            <p>Pcos</p>{" "}
          </button>
          <button
            className={`card`}
            // onClick={() => setCat(2)}
          >
            {" "}
            <p>+</p>{" "}
          </button>
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
  const [category, setCategories] = useState(0);
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
