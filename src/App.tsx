import "./App.css";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface Station {
  image: string;
  liveaudio: {
    url: string;
  };
  tagline: string;
  // Add other properties based on your actual data structure
}

const App: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [taglineSrc, setTaglineSrc] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const fetchStations = async (): Promise<Station[]> => {
    try {
      const response = await fetch(
        "https://api.sr.se/api/v2/channels?format=json"
      );
      const data = await response.json();
      return data.channels;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const init = async () => {
      const fetchedData = await fetchStations();
      setStations(fetchedData);
      setImgSrc(fetchedData[0].image);
      setAudioSrc(fetchedData[0].liveaudio.url);
      setTaglineSrc(fetchedData[0].tagline);
      console.log(fetchedData);
    };

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
      <div className="imgArrowWrapper">
      <AiOutlineArrowLeft className="leftArrow" onClick={minusClick} />
      <img src={imgSrc} alt="" />
      <AiOutlineArrowRight className="rightArrow" onClick={plusClick} />
      </div>
      <br />
      <audio controls src={audioSrc}></audio>
    </div>
  );
};

export default App;
