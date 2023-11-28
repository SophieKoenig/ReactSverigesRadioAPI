import "./App.css";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

//image declared as string because property contains an URL
interface Station {
  image: string;
  liveaudio: {
    url: string;
  };
}

const App: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [audioSrc, setAudioSrc] = useState<string>("");
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

  //following function returns an array with at least one station
  //by checking the length of fetched data array ensure initial station is properly displayed
  useEffect(() => {
    const init = async () => {
      const fetchedData = await fetchStations();
      console.log(fetchedData);

      if (fetchedData.length > 0) {
        setStations(fetchedData);
        setImgSrc(fetchedData[0].image);
        setAudioSrc(fetchedData[0].liveaudio.url);
      } else {
        // Handle the case where no stations are fetched
        console.error("No stations fetched.");
      }
    };

    init();
  }, []);

  //combined state-setting calls to simplify the code (otherwise repetition of different states like 'imgSrc' & 'audioSrc')
  const updateStation = (newCount: number) => {
    setCount(newCount);
    setImgSrc(stations[newCount].image);
    setAudioSrc(stations[newCount].liveaudio.url);
  };

  //a function with a parameter that determines the direction (before I had two functions for + and one for - direction) to reduce code duplication
  const handleArrowClick = (direction: number) => {
    const newCount = (count + direction + stations.length) % stations.length;
    updateStation(newCount);
  };

  return (
    <div>
      <h1>Sverige Radio</h1>
      <h4>Lyssna direkt på Sveriges Radio</h4>
      <div className="imgArrowWrapper">
        <AiOutlineArrowLeft
          className="leftArrow"
          onClick={() => handleArrowClick(-1)}
        />
        <img src={imgSrc} alt="" />
        <AiOutlineArrowRight
          className="rightArrow"
          onClick={() => handleArrowClick(1)}
        />
      </div>
      <br />
      <audio controls src={audioSrc}></audio>
    </div>
  );
};

export default App;
