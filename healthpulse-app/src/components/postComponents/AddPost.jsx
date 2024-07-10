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

const AddPost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(undefined);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  // Field changed function
  const fieldChanged = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
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

  return (
    <div
      className="wrapper"
      style={{ margin: "0 auto", maxWidth: "1200px", padding: "20px" }}
    >
      <Card
        className="mt-2"
        style={{ boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <CardBody>
          <h3 className="text-center">What's going on in your mind?</h3>
          <Form onSubmit={createPost}>
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
        </CardBody>
      </Card>
    </div>
  );
};

export default AddPost;
