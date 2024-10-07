import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../../auth";
import userContext from "../../context/userContext";
import { BASE_URL } from "../../service/helper";

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

  // Function to safely truncate HTML content
  const truncateHtml = (html, maxLength) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <Card className="border-0 shadow-sm mt-3">
      <CardBody>
        <h3 className="mb-3">{post.title}</h3>

        <div className="d-flex flex-column flex-md-row">
          {post.imageName && (
            <div
              className="post-image me-md-4 mb-3 mb-md-0"
              style={{
                width: "200px",
                minWidth: "200px",
                height: "150px",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <img
                src={`${BASE_URL}/api/post/image/${post.imageName}`}
                alt={post.title}
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <div className="post-content flex-grow-1">
            <CardText className="mb-3">
              {truncateHtml(post.content || "No content available", 350)}
            </CardText>

            <div className="d-flex flex-wrap gap-2">
              <Link
                className="btn btn-secondary border-0"
                to={"/posts/" + post.postId}
              >
                Read More
              </Link>

              {userContextData?.user?.login && user?.id === post.userId && (
                <>
                  <Button onClick={() => deletePost(post)} color="danger">
                    Delete
                  </Button>
                  <Button
                    tag={Link}
                    to={`/user/update-blog/${post.postId}`}
                    color="warning"
                  >
                    Update
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
