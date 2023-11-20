import "./App.css";
import React, { useState, useEffect } from "react"; //import the hook //all of them starting with "use" //returns an array with two states
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////FUNCTION COMPONENT + HOOKS/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const App = () => {
  const [stations, setStations] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [taglineSrc, setTaglineSrc] = useState("");
  const [count, setCount] = useState(0);

  const fetchStations = async () => {
    return fetch("https://api.sr.se/api/v2/channels?format=json")
      .then((response) => response.json())
      .then((data) => data.channels)
      .catch((error) => console.error(error));
  };

  //only happens at the start
  useEffect(() => {
    async function init() {
      const fetchedData = await fetchStations();
      setStations(fetchedData);
      setImgSrc(fetchedData[0].image);
      setAudioSrc(fetchedData[0].liveaudio.url);
      setTaglineSrc(fetchedData[0].tagline);
      console.log(fetchedData);
    }

    init();
  }, []);

  const plusClick = () => {
    if (count === 9) {
      setCount(0);
        setImgSrc(stations[0].image);
        setTaglineSrc(stations[0].tagline);
      setAudioSrc(stations[0].liveaudio.url);
    } else {
      setCount(count + 1);
       setImgSrc(stations[count + 1].image);
       setTaglineSrc(stations[count + 1].tagline);
      setAudioSrc(stations[count + 1].liveaudio.url);
    }
  };

  const minusClick = () => {
    if (count === 0) {
      setCount(stations.length - 1);
        setImgSrc(stations[stations.length - 1].image);
        setTaglineSrc(stations[stations.length - 1].tagline);
      setAudioSrc(stations[stations.length - 1].liveaudio.url);
    } else {
      setCount(count - 1);
        setImgSrc(stations[count - 1].image);
        setTaglineSrc(stations[count - 1].tagline);
      setAudioSrc(stations[count - 1].liveaudio.url);
    }
  };

  return (
    <div>
      <h1>Sverige Radio</h1>
      <h4>Lyssna direkt på Sveriges Radio</h4>
      {/* <p>You clicked {count} times</p> */}
      <AiOutlineArrowLeft className="leftArrow" onClick={() => minusClick()} />
      <AiOutlineArrowRight className="rightArrow" onClick={() => plusClick()} />
      <img src={imgSrc} alt="" />
      {/* onClick={() => setCount(count + 1)} */}
      <br />
      <audio controls src={audioSrc}></audio>
    </div>
  ); //
};

export default App;
