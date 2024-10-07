import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardBody, Form, Input, Label, Button } from "reactstrap";
import { loadAllCategories } from "../../service/category-service";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { createPost as doCreatePost } from "../../service/post-service";
import { uploadPostImage } from "../../service/post-service";
import { toast } from "react-toastify";
import { getCurrentUserDetail } from "../../auth";
import "./AddPost.css";

import axios from "axios"; // You need axios for API calls
import { geminiKey } from "../../servicePage/apiKeys";

const apiKeyGemini = geminiKey;
const AddPost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  // Field changed function
  const fieldChanged = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // Function to convert HTML to plain text
  const htmlToText = (html) => {
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const contentFieldChanged = (newContent) => {
    setPost({ ...post, content: newContent });
  };

  // Reset form function
  const resetForm = () => {
    setPost({
      title: "",
      content: "",
      categoryId: "",
    });
    setContent("");
  };

  //image upload

  const [image, setImage] = useState(null);

  // Create post function
  const createPost = (e) => {
    e.preventDefault();
    console.log("form submitted", post);

    if (user && user.id) {
      post["userId"] = user.id;
    } else {
      toast.error("User not logged in");
      return;
    }

    if (post.title.trim() === "") {
      toast.error("Please enter title");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("Please enter content");
      return;
    }
    if (post.categoryId === "") {
      toast.error("Please select category");
      return;
    }

    // Submit the form to the server
    doCreatePost(post)
      .then((data) => {
        // Upload image
        uploadPostImage(image, data.postId)
          .then((data) => {
            toast.success("Image Uploaded !!");
          })
          .catch((error) => {
            toast.error("Error in uploading image");
            console.log(error);
          });

        console.log(data);
        toast.success("Post created successfully");
        resetForm(); // Reset the form after successful post creation
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    setUser(getCurrentUserDetail());

    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // File change handler

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Gemini API call to generate prompt
  const generateFromGemini = async (text) => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        { contents: [{ parts: [{ text }] }] }
      );
      const generatedPrompt = response.data.candidates[0].content.parts[0].text;
      setPrompt(generatedPrompt);
      return generatedPrompt;
    } catch (error) {
      console.error("Error generating from Gemini:", error);
      setError("Error generating content");
    }
  };

  // Image generation based on prompt
  const handleImageGeneration = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);

    try {
      const modifiedPrompt = `Generate an image for this situation: ${prompt}`;
      const imageResponse = await axios.post(
        "http://localhost:8095/generate-image",
        { prompt: modifiedPrompt },
        { responseType: "blob" }
      );

      if (imageResponse.status === 200) {
        const imageBlob = new Blob([imageResponse.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl); // This updates the imageUrl state to display the preview
      } else {
        setError("Error generating image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Error generating content");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the full process (convert HTML -> Generate prompt -> Generate image)
  const handleFullProcess = async () => {
    const plainTextContent = htmlToText(content); // Convert Jodit HTML content to text
    const generatedPrompt = await generateFromGemini(plainTextContent); // Generate prompt
    if (generatedPrompt) {
      await handleImageGeneration(); // Generate image based on prompt
    }
  };

  return (
    <div
      className="wrapper"
      style={{ margin: "0 auto", maxWidth: "800px", padding: "20px" }}
    >
      <Card
        className="mt-24"
        style={{
          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <CardBody>
          <h3 className="text-center">What's going on in your mind?</h3>
          <Form onSubmit={createPost} style={{ width: "100%" }}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                name="title"
                value={post.title}
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={contentFieldChanged}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>

            {/* File field */}

            <div className="mt-3">
              <Label for="image">Select post banner</Label>
              <Input id="image" type="file" onChange={handleFileChange}></Input>
            </div>

            <div className="my-3">
              <Label for="category">Add Category</Label>
              <Input
                type="select"
                id="category"
                name="categoryId"
                value={post.categoryId}
                onChange={fieldChanged}
              >
                <option disabled value="">
                  --Select Category--
                </option>
                {categories.map((category) => (
                  <option value={category.categoryId} key={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>
            <div className="button-container text-center">
              <Button
                type="submit"
                className="small-button button me-2"
                color="primary"
              >
                Create Post
              </Button>
              <Button
                type="button"
                className="small-button button reset-button"
                color="danger"
                onClick={resetForm}
              >
                Reset
              </Button>
            </div>
          </Form>

          {/* Image Generation and Gemini functionality */}
          <div className="text-center mt-4">
            <Button
              color="success"
              onClick={handleFullProcess}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Image from Post Content"}
            </Button>
          </div>

          {error && <p className="text-danger text-center mt-3">{error}</p>}

          {imageUrl && (
            <div className="image-preview mt-4 text-center">
              <h5>Generated Image:</h5>
              <img
                src={imageUrl}
                alt="Generated"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
