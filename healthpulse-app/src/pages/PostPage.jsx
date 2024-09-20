import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { createComment, loadPost } from "../service/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../service/helper";
import { isLoggedIn } from "../auth";
import { getUser } from "../service/user-service";
import axios from "axios";
import { geminiKey } from "../servicePage/apiKeys";

const apiKeyGemini = geminiKey;

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState({
    content: "",
  });
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load post of postId
    loadPost(postId)
      .then((data) => {
        console.log(data);
        setPost(data);

        // Fetch user data by userId
        return getUser(data.userId);
      })
      .then((userData) => {
        console.log(userData);
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading post or user data");
      });
  }, [postId]);

  const printDate = (numbers) => {
    return new Date(numbers).toLocaleDateString();
  };

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
      .then((data) => {
        console.log(data);
        toast.success("Comment added!");

        // Refresh the page
        window.location.reload();

        setPost({
          ...post,
          comments: [...post.comments, data.data],
        });
        setComment({
          content: "",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in adding comment");
      });
  };

  const handleLearnMoreAI = async () => {
    setLoading(true);
    const prompt = `Check the accuracy and provide more information for the following content : "${post.content}".`;

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
      console.error("Error fetching AI response:", error);
      toast.error("Error in fetching AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link> / {post && <Link to="">{post.title}</Link>}
        <Row>
          <Col md={{ size: 12 }}>
            <Card className="mt-3 ps-2 border-0 shadow-sm">
              {post && (
                <CardBody>
                  <CardText>
                    Posted By{" "}
                    <b>
                      <Link
                        to={`/user/my-profile/${post.userId}`}
                        style={{ textDecoration: "none" }}
                      >
                        {user ? user.name.toUpperCase() : "Loading..."}
                      </Link>
                    </b>{" "}
                    on <b>{printDate(post.addedDate)}</b>
                  </CardText>

                  <CardText>
                    <span className="text-muted">
                      {post.category.categoryTitle}
                    </span>
                  </CardText>

                  <div
                    className="divder"
                    style={{
                      width: "100%",
                      height: "1px",
                      background: "#e2e2e2",
                    }}
                  ></div>

                  <CardText className="mt-3">
                    <h1>{post.title}</h1>
                  </CardText>
                  <div
                    className="image-container mt-4 shadow"
                    style={{ maxWidth: "50%" }}
                  >
                    <img
                      className="img-fluid"
                      src={BASE_URL + "/api/post/image/" + post.imageName}
                      alt=""
                    />
                  </div>
                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
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
                        __html: aiResponse
                          .replace(
                            /\*\*Accuracy:\*\*/g,
                            '<b style="font-size: 1.2em;">Accuracy:</b>'
                          )
                          .replace(
                            /\*\*Additional Information:\*\*/g,
                            '<b style="font-size: 1.2em;">Additional Information:</b>'
                          )
                          .replace(
                            /\*\*Type 1 Diabetes:\*\*/g,
                            '<b style="font-size: 1.1em;">Type 1 Diabetes:</b>'
                          )
                          .replace(
                            /\*\*Type 2 Diabetes:\*\*/g,
                            '<b style="font-size: 1.1em;">Type 2 Diabetes:</b>'
                          )
                          .replace(
                            /\*\*Elevated Blood Sugar:\*\*/g,
                            '<b style="font-size: 1.1em;">Elevated Blood Sugar:</b>'
                          )
                          .replace(
                            /\*\*Blood Sugar Threshold:\*\*/g,
                            '<b style="font-size: 1.1em;">Blood Sugar Threshold:</b>'
                          )
                          .replace(
                            /\*\*Diabetic Ketoacidosis:\*\*/g,
                            '<b style="font-size: 1.1em;">Diabetic Ketoacidosis:</b>'
                          )
                          .replace(
                            /\*\*Importance of Monitoring:\*\*/g,
                            '<b style="font-size: 1.1em;">Importance of Monitoring:</b>'
                          )
                          .replace(
                            /\*\*Different Medications:\*\*/g,
                            '<b style="font-size: 1.1em;">Different Medications:</b>'
                          )
                          .replace(
                            /\*\*Professional Guidance:\*\*/g,
                            '<b style="font-size: 1.1em;">Professional Guidance:</b>'
                          ),
                      }}
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
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
  );
};

export default PostPage;
