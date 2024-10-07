// import { PrettyChatWindow } from "react-chat-engine-pretty";
import { ChatEngine } from "react-chat-engine";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { getCurrentUserDetail } from "../auth";

const ChatsPage = () => {
  // Retrieve username and secret from local storage
  const username = localStorage.getItem("username");
  const secret = localStorage.getItem("password");

  return (
    // <div style={{ height: "100vh", width: "100vw" }}>
    //   <ChatEngine
    //     publicKey="4dcb2df5-9316-4cba-aa5a-76711e034d8f"
    //     userName= {getCurrentUserDetail().name} // Retrieved from local storage
    //     userSecret={secret} // Retrieved from local storage
    //     style={{ height: "100%" }}
    //   />
    // </div>
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="e9453cd6-dc1a-43bd-ab27-13ae48e57050"
        username={getCurrentUserDetail().name}
        secret={secret}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;
