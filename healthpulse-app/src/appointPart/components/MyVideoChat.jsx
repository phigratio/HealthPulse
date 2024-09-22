// import React, { useEffect } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useSearchParams } from "react-router-dom";
// import AppointService from "../service/AppointService";
// import { getUserData } from "../../service/user-service";

// // Get token
// function generateToken(tokenServerUrl, userID) {
//   return fetch(
//     `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
//     {
//       method: "GET",
//     }
//   ).then((res) => res.json());
// }

// function randomID(len) {
//   let result = "";
//   const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
//   const maxPos = chars.length;
//   for (let i = 0; i < (len || 5); i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export default function MyVideoChat() {
//   const [searchParams] = useSearchParams();
//   const appointmentId = searchParams.get("appointmentId"); // Get appointmentId from the query params
//   const roomID = randomID(5);

//   useEffect(() => {
//     const startMeeting = async () => {
//       try {
//         const videoCallUrl =
//           window.location.origin +
//           window.location.pathname +
//           "?roomID=" +
//           roomID; // Dynamically generate videoCallUrl
//         // Call startMeeting using the appointmentId and videoCallUrl
//         await AppointService.startMeeting(appointmentId, videoCallUrl);
//         console.log("Meeting started successfully for appointment", appointmentId);
//       } catch (error) {
//         console.error("Error starting meeting:", error);
//       }
//     };

//     if (appointmentId) {
//       startMeeting();
//     }
//   }, [appointmentId, roomID]);

//   const myMeeting = async (element) => {
//     const userID = randomID(5);
//     const userData = getUserData(); // Get user data from local storage
//     const userName = userData ? userData.name : "Guest"; // Use the user's name or fallback to "Guest"

//     generateToken("https://nextjs-token.vercel.app/api", userID).then((res) => {
//       const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
//         1484647939,
//         res.token,
//         roomID,
//         userID,
//         userName // Use the fetched userName here
//       );

//       const zp = ZegoUIKitPrebuilt.create(token);

//       // Log the shared link dynamically generated
//       const sharedLink =
//         window.location.origin + window.location.pathname + "?roomID=" + roomID;

//       console.log("Shared Link:", sharedLink);

//       zp.joinRoom({
//         container: element,
//         sharedLinks: [
//           {
//             name: "Personal link",
//             url: sharedLink, // Use the dynamically generated URL here
//           },
//         ],
//         scenario: {
//           mode: ZegoUIKitPrebuilt.VideoConference,
//         },
//       });
//     });
//   };

//   return (
//     <div
//       className="myCallContainer"
//       ref={myMeeting}
//       style={{ width: "100vw", height: "100vh" }}
//     ></div>
//   );
// }

// import React, { useEffect } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useSearchParams } from "react-router-dom";
// import AppointService from "../service/AppointService";
// import { getUserData } from "../../service/user-service";

// // Get token
// function generateToken(tokenServerUrl, userID) {
//   return fetch(
//     `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
//     {
//       method: "GET",
//     }
//   ).then((res) => res.json());
// }

// function randomID(len) {
//   let result = "";
//   const chars =
//     "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
//   const maxPos = chars.length;
//   for (let i = 0; i < (len || 5); i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export default function MyVideoChat() {
//   const [searchParams] = useSearchParams();
//   const appointmentId = searchParams.get("appointmentId"); // Get appointmentId from the query params
//   const roomID = searchParams.get("roomID"); // Get roomID from the URL params

//   useEffect(() => {
//     const startMeeting = async () => {
//       try {
//         const videoCallUrl =
//           window.location.origin +
//           window.location.pathname +
//           "?roomID=" +
//           roomID; // Use the existing roomID
//         // Call startMeeting using the appointmentId and videoCallUrl
//         await AppointService.startMeeting(appointmentId, videoCallUrl);
//         console.log(
//           "Meeting started successfully for appointment",
//           appointmentId
//         );
//       } catch (error) {
//         console.error("Error starting meeting:", error);
//       }
//     };

//     if (appointmentId) {
//       startMeeting();
//     }
//   }, [appointmentId, roomID]);

//   const myMeeting = async (element) => {
//     const userID = randomID(5);
//     const userData = getUserData(); // Get user data from local storage
//     const userName = userData ? userData.name : "Guest"; // Use the user's name or fallback to "Guest"

//     generateToken("https://nextjs-token.vercel.app/api", userID).then((res) => {
//       const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
//         1484647939,
//         res.token,
//         roomID, // Use the existing roomID here
//         userID,
//         userName // Use the fetched userName here
//       );

//       const zp = ZegoUIKitPrebuilt.create(token);

//       // Log the shared link dynamically generated
//       const sharedLink =
//         window.location.origin + window.location.pathname + "?roomID=" + roomID;

//       console.log("Shared Link:", sharedLink);

//       zp.joinRoom({
//         container: element,
//         sharedLinks: [
//           {
//             name: "Personal link",
//             url: sharedLink, // Use the dynamically generated URL here
//           },
//         ],
//         scenario: {
//           mode: ZegoUIKitPrebuilt.VideoConference,
//         },
//       });
//     });
//   };

//   return (
//     <div
//       className="myCallContainer"
//       ref={myMeeting}
//       style={{ width: "100vw", height: "100vh" }}
//     ></div>
//   );
// }

import React, { useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSearchParams } from "react-router-dom";
import AppointService from "../service/AppointService";
import { getUserData } from "../../service/user-service";

// Get token
function generateToken(tokenServerUrl, userID) {
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
}

function randomID(len) {
  let result = "";
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;
  for (let i = 0; i < (len || 5); i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export default function MyVideoChat() {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId"); // Get appointmentId from the query params
  const roomID = searchParams.get("roomID") || randomID(5); // Use random ID if roomID is not present

  useEffect(() => {
    const startMeeting = async () => {
      try {
        const videoCallUrl =
          window.location.origin +
          window.location.pathname +
          "?roomID=" +
          roomID; // Use the roomID (either from params or generated)
        // Call startMeeting using the appointmentId and videoCallUrl
        await AppointService.startMeeting(appointmentId, videoCallUrl);
        console.log(
          "Meeting started successfully for appointment",
          appointmentId
        );
      } catch (error) {
        console.error("Error starting meeting:", error);
      }
    };

    if (appointmentId) {
      startMeeting();
    }
  }, [appointmentId, roomID]);

  const myMeeting = async (element) => {
    const userID = randomID(5);
    const userData = getUserData(); // Get user data from local storage
    const userName = userData ? userData.name : "Guest"; // Use the user's name or fallback to "Guest"

    generateToken("https://nextjs-token.vercel.app/api", userID).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        1484647939,
        res.token,
        roomID, // Use the roomID (either from params or generated)
        userID,
        userName // Use the fetched userName here
      );

      const zp = ZegoUIKitPrebuilt.create(token);

      // Log the shared link dynamically generated
      const sharedLink =
        window.location.origin + window.location.pathname + "?roomID=" + roomID;

      console.log("Shared Link:", sharedLink);

      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Personal link",
            url: sharedLink, // Use the dynamically generated URL here
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
