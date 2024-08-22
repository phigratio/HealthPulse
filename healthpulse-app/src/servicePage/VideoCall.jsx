import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

const ZegoVideoCall = ({ onReady }) => {
  const roomID = getUrlParams().get("roomID") || randomID(5);

  const generateKitToken = () => {
    const appID = 12666507;
    const serverSecret = "d2c8c1901e2c09c8c1923b5bae5e1ec6";
    const userID = randomID(5);
    const userName = randomID(5);
    const tokenExpiration = 3600; // Token validity in seconds (1 hour)

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName,
      Math.floor(Date.now() / 1000) + tokenExpiration
    );

    return kitToken;
  };

  const myMeeting = async (element) => {
    const kitToken = generateKitToken();

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  React.useEffect(() => {
    if (onReady) {
      const container = document.getElementById("zego-container");
      if (container) {
        myMeeting(container);
      }
    }
  }, [onReady]);

  return (
    <div id="zego-container" style={{ width: "100vw", height: "100vh" }}></div>
  );
};

export default ZegoVideoCall;
