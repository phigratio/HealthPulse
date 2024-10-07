import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Row,
  Input,
} from "reactstrap";
import Base from "../components/Base";
import {
  createComment,
  loadPost,
  deletePostService,
} from "../service/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../service/helper";
import { isLoggedIn } from "../auth";
import { getUserData, getUser } from "../service/user-service";
import axios from "axios";
import { geminiKey } from "../servicePage/apiKeys";
import Background from "../components/basicComponents/Background";

const apiKeyGemini = geminiKey;

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [blogOwner, setBlogOwner] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // Ownership flag
  const [comment, setComment] = useState({ content: "" });
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPostAndOwner = async () => {
      try {
        const loggedInUser = getUserData();
        console.log("Logged in user:", loggedInUser); // Debug line

        if (loggedInUser) {
          setCurrentUser(loggedInUser);
        }

        const data = await loadPost(postId);
        setPost(data);
        console.log("Post user ID:", data.userId); // Debug line

        const owner = await getUser(data.userId);
        setBlogOwner(owner);
        console.log("Blog owner:", owner); // Debug line

        if (loggedInUser && parseInt(data.userId) === loggedInUser.id) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }
      } catch (error) {
        toast.error("Error in loading post");
      }
    };

    fetchPostAndOwner();
  }, [postId]);

  const submitPost = () => {
    if (!isLoggedIn()) {
      toast.error("Need to login first!!");
      return;
    }

    if (comment.content.trim() === "") {
      toast.error("Comment can't be empty");
      return;
    }

    createComment(comment, post.postId)
      .then(() => {
        toast.success("Comment added!");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Error in adding comment");
      });
  };

  // Redirect to update page when update button is clicked
  const handleUpdatePost = () => {
    navigate(`/user/update-blog/${postId}`);
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePostService(postId)
        .then(() => {
          toast.success("Post deleted successfully!");
          navigate("/user/dashboard"); // Redirect to home after deletion
        })
        .catch((error) => {
          toast.error("Error deleting the post. Please try again.");
        });
    }
  };

  const handleLearnMoreAI = async () => {
    setLoading(true);
    const prompt = ` Give me a detailed analysis in a 500 word paragraph without any formetting. Check the accuracy and provide more information for the following content: "${post.content}". Give me a detailed analysis in a 500 word paragraph without any formetting.`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );

      setAiResponse(
        response.data.candidates[0].content.parts[0].text || "No result found"
      );
    } catch (error) {
      toast.error("Error in fetching AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Background />
      <Base>
        <Container className="mt-4">
          <Link to="/">Home</Link> / {post && <Link to="">{post.title}</Link>}
          <Row>
            <Col md={{ size: 12 }}>
              <Card className="mt-3 ps-2 border-0 shadow-sm">
                {post ? (
                  <CardBody>
                    <CardText>
                      Posted By{" "}
                      <b>
                        <Link
                          to={`/user/my-profile/${post.userId}`}
                          style={{ textDecoration: "none" }}
                        >
                          {blogOwner
                            ? blogOwner.name.toUpperCase()
                            : "Loading..."}
                        </Link>
                      </b>{" "}
                      on <b>{new Date(post.addedDate).toLocaleDateString()}</b>
                    </CardText>

                    <div className="mt-3">
                      <h1>{post.title}</h1>
                      <div
                        className="image-container mt-4 shadow"
                        style={{ maxWidth: "50%" }}
                      >
                        <img
                          className="img-fluid"
                          src={BASE_URL + "/api/post/image/" + post.imageName}
                          alt="Post"
                        />
                      </div>
                      <CardText
                        className="mt-5"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />
                    </div>
                    {isOwner ? (
                      <div>
                        <div className="mt-4">
                          <Button color="warning" onClick={handleUpdatePost}>
                            Update Post
                          </Button>{" "}
                          <Button color="danger" onClick={handleDeletePost}>
                            Delete Post
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-muted">
                          You are not the owner of this post.
                        </span>
                      </div>
                    )}
                  </CardBody>
                ) : (
                  <div>Loading...</div>
                )}
              </Card>
              <Card className="mt-4 border-0">
                <CardBody>
                  <Button
                    color="primary"
                    onClick={handleLearnMoreAI}
                    disabled={loading}
                  >
                    {loading ? "Analyzing..." : "Learn More from AI"}
                  </Button>

                  {aiResponse && (
                    <CardText className="mt-4">
                      <h5>AI Response:</h5>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: aiResponse,
                        }}
                        style={{
                          whiteSpace: "pre-wrap",
                          wordWrap: "break-word",
                        }}
                      />
                    </CardText>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="my-4">
            <Col md={{ size: 9, offset: 1 }}>
              <h3>Comments ({post ? post.comments.length : 0})</h3>

              {post &&
                post.comments &&
                post.comments.map((c, index) => (
                  <Card className="mt-4 border-0" key={index}>
                    <CardBody>
                      <CardText>{c.content}</CardText>
                    </CardBody>
                  </Card>
                ))}

              <Card className="mt-4 border-0">
                <CardBody>
                  <Input
                    type="textarea"
                    placeholder="Enter comment here"
                    value={comment.content}
                    onChange={(event) =>
                      setComment({ content: event.target.value })
                    }
                  />
                  <Button onClick={submitPost} className="mt-2" color="primary">
                    Submit
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default PostPage;
