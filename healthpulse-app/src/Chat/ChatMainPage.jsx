import React from "react";
import { useState } from "react";
import Base from "../components/Base";
import Background from "../components/basicComponents/Background";

import ChatsPage from "./chatsPage";

const ChatMainPage = () => {
  const [user, setUser] = useState();

  return (
    <div style={{ background: "rgb(40, 43, 54)" }}>
      <Base>
        <div style={{ marginTop: "5rem" }}>
          <ChatsPage />
        </div>
      </Base>
    </div>
  );
};

export default ChatMainPage;
