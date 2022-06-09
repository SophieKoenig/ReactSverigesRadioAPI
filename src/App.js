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
      console.log(fetchedData);
    }

    init();
  }, []);

  const plusClick = () => {
    if (count === 9) {
      setCount(0);
      setImgSrc(stations[0].image);
      setAudioSrc(stations[0].liveaudio.url);
    } else {
      setCount(count + 1);
      setImgSrc(stations[count + 1].image);
      setAudioSrc(stations[count + 1].liveaudio.url);
    }
  };

  const minusClick = () => {
    if (count === 0) {
      setCount(stations.length - 1);
      setImgSrc(stations[stations.length - 1].image);
      setAudioSrc(stations[stations.length - 1].liveaudio.url);
    } else {
      setCount(count - 1);
      setImgSrc(stations[count - 1].image);
      setAudioSrc(stations[count - 1].liveaudio.url);
    }
  };

  return (
    <div>
      <h1>Sverige Radio</h1>
      <h4>Lyssna direkt på Sveriges Radio</h4>
      <p src={stations}></p>
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////CLASS COMPONENT + NO HOOKS//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// class App extends React.Component {
//   state = {
//     channels: [],
//     //filter: "",
//   };
//   //}

//   //componentDidMount() invoked directly after component is mounted(inserted into the tree) +
//   //call setState() as well inside function that will trigger an extra rendering, but before browser updates the screen
//   //that means even though render() will be called twice the user does not see the intermediate state
//   async componentDidMount() {
//     await fetch("http://api.sr.se/api/v2/channels?format=json")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         this.setState({ channels: data.channels }); //setState schedules updates to the components local state
//       });
//   }

//   render() {
//     // const stringProps = JSON.stringify(this.props);
//     // <h2>{stringProps}</h2>

//     //this was giving out an empty array when I console.logged it
//     //(I think it was giving me state out before it got filled with data from the API):
//     // let { channels } = this.state;
//     // if (this.state.filter !== "") {
//     //   channels = channels.filter((item) => item.name === this.state.filter);
//     // }

//     const imageClick = () => {
//       console.log("Click");
//       //this.state.channels[0] ? this.state.channels[0].liveaudio.url : null;
//     };

//     return (
//       <div className="page">
//         <h1>Sverige Radio</h1>
//         <h4>Lyssna direkt på Sveriges Radio</h4>
//         {/* neccessary to get a specific object in the array: */}
//         {console.log(this.state.channels[0] ? this.state.channels[0] : null)}
//         {/* {this.state.channels.length > 0 && (
//           <App channels={this.state.channels} />
//         )} */}
//         <a
//           href={
//             this.state.channels[0] ? this.state.channels[0].liveaudio.url : null
//           }
//           onClick={imageClick}
//         >
//           <img
//             id="imageRadio"
//             // onClick={() => {
//             //   imageClick();
//             // }}
//             src={this.state.channels[0] ? this.state.channels[0].image : null}
//           />
//         </a>
//         <br />
//         <audio
//           id="radioPlayer"
//           controls
//           src={
//             this.state.channels[0] ? this.state.channels[0].liveaudio.url : null
//           }
//           type="audio/mpeg"
//         ></audio>
//       </div>
//     )}
//   }

// {/* //ReactDOM.render(<App firstName="Sophie" />, document.getElementById("root"));
// //hereComesAProp="myProps" */}

//ReactDOM.render(<App />, document.getElementById("root"));
