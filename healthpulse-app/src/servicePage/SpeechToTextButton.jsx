// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../style/servicePage/RecordingButtons.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";

// const API_KEY = "AIzaSyDpFU-kHOjaho5XkiPTrfvXOxebgw9T2Kg"; // Be cautious with exposing this key

// const SpeechToTextApp = ({ onTranscriptUpdate }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState(null);

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
//         setMediaRecorder(recorder);

//         recorder.ondataavailable = (event) => {
//           if (event.data.size > 0) {
//             sendAudioToAPI(event.data);
//           }
//         };
//       })
//       .catch((error) => {
//         console.error("Error accessing microphone:", error);
//       });
//   }, []);

//   const startRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.start();
//       setIsRecording(true);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       setIsRecording(false);
//     }
//   };

//   const sendAudioToAPI = async (audioBlob) => {
//     const audioBase64 = await blobToBase64(audioBlob);

//     const requestBody = {
//       config: {
//         encoding: "WEBM_OPUS",
//         sampleRateHertz: 48000,
//         languageCode: "en-US",
//       },
//       audio: {
//         content: audioBase64,
//       },
//     };

//     try {
//       const response = await axios.post(
//         `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`,
//         requestBody
//       );

//       if (response.data.results && response.data.results.length > 0) {
//         const transcript = response.data.results[0].alternatives[0].transcript;
//         onTranscriptUpdate(transcript);
//       }
//     } catch (error) {
//       console.error("Error sending audio to API:", error);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//       }
//     }
//   };

//   const blobToBase64 = (blob) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result.split(",")[1];
//         resolve(base64String);
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   };

//   return (
//     <div className="recording-buttons-container">
//       <button
//         onClick={isRecording ? stopRecording : startRecording}
//         className={`recording-button ${isRecording ? "stop" : "start"}`}
//       >
//         <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
//       </button>
//     </div>
//   );
// };

// export default SpeechToTextApp;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/servicePage/RecordingButtons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import { speechToText } from "./apiKeys";

const API_KEY = speechToText;

const SpeechToTextApp = ({ onTranscriptUpdate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            sendAudioToAPI(event.data);
          }
        };
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  }, []);

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "recording") {
      mediaRecorder.start();
      setIsRecording(true);
    } else {
      console.warn("Recording is already in progress");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setIsRecording(false);
    } else {
      console.warn("No recording in progress to stop");
    }
  };

  const sendAudioToAPI = async (audioBlob) => {
    const audioBase64 = await blobToBase64(audioBlob);

    const requestBody = {
      config: {
        encoding: "WEBM_OPUS",
        sampleRateHertz: 48000,
        languageCode: "en-US",
      },
      audio: {
        content: audioBase64,
      },
    };

    try {
      const response = await axios.post(
        `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`,
        requestBody
      );

      if (response.data.results && response.data.results.length > 0) {
        const transcript = response.data.results[0].alternatives[0].transcript;
        onTranscriptUpdate(transcript);
      }
    } catch (error) {
      console.error("Error sending audio to API:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="recording-buttons-container">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`recording-button ${isRecording ? "stop" : "start"}`}
      >
        <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
      </button>
    </div>
  );
};

export default SpeechToTextApp;
