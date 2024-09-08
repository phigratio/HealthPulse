// import { PrettyChatWindow } from "react-chat-engine-pretty";
import { ChatEngine } from "react-chat-engine";

const ChatsPage = () => {
  // Retrieve username and secret from local storage
  const username = localStorage.getItem("username");
  const secret = localStorage.getItem("password");

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ChatEngine
        publicKey="d678a4f8-ec97-49ef-8d5f-fea787c409b1"
        userName={username} // Retrieved from local storage
        userSecret={secret} // Retrieved from local storage
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default ChatsPage;
