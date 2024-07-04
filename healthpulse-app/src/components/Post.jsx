import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "../context/userContext";

function Post({
  post = {
    id: -1,
    title: "This is default post title",
    content: "This is default post content",
  },
  deletePost,
}) {
  const userContextData = useContext(userContext);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    setUser(getCurrentUserDetail());
    setLogin(isLoggedIn());
  }, []);

  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h3>{post.title}</h3>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content
              ? post.content.substring(0, 30) + "...."
              : "No content available",
          }}
        ></CardText>

        <div>
          <Link
            className="btn btn-secondary border-0 button "
            to={"/posts/" + post.postId}
          >
            Read More
          </Link>
          {userContextData &&
            userContextData.user &&
            userContextData.user.login &&
            (user && user.id === post.user.id ? (
              <>
                <Button
                  onClick={(event) => deletePost(post)}
                  color="danger"
                  className="ms-2 mt-1 "
                >
                  Delete
                </Button>
                <Button
                  tag={Link}
                  to={`/user/update-blog/${post.postId}`}
                  color="warning"
                  className="ms-2 "
                >
                  Update
                </Button>
              </>
            ) : null)}
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
