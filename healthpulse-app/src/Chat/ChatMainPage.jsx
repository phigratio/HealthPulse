import React from "react";
import { useState } from "react";
import Base from "../components/Base";
import Background from "../components/basicComponents/Background";

import ChatsPage from "./chatsPage";

const ChatMainPage = () => {
  const [user, setUser] = useState();

  return (
    <div>
      <Background />
      <Base>
        <div className="mt-12">
          <ChatsPage />
        </div>
      </Base>
    </div>
  );
};

export default ChatMainPage;
