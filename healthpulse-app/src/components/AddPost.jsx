//AddPost.jsx

import React, { useEffect } from "react";
import { useState } from "react";
import { Card, CardBody, Form, Input, Label, Button } from "reactstrap";
import { loadAllCategories } from "../service/category-service";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { createPost as doCreatePost } from "../service/post-service";

const AddPost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [categories, setCategories] = useState([]);

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  //field changed function

  const fieldChanged = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const contentFieldChanged = (newContent) => {
    setPost({ ...post, content: newContent });
  };

  //create post function

  const createPost = (e) => {
    e.preventDefault();
    console.log("form submitted", post);

    if (post.title.trim() === "") {
      alert("Please enter title");
      return;
    }
    if (post.content.trim() === "") {
      alert("Please enter content");
      return;
    }
    if (post.categoryId === "") {
      alert("Please select category");
      return;
    }

    // submit the form on server  (video no: 18)

    doCreatePost(post)
      .then((data) => {
        console.log(data);
        alert("Post created successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
  };

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {JSON.stringify(post)}
          <h3 className="text-center">What's going on in your mind?</h3>
          <Form onSubmit={createPost}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                name="title"
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <Label for="content">Post Content</Label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here"
                style={{ height: "300px" }}
              /> */}
              <JoditEditor
                ref={editor}
                value={content}
                onChange={contentFieldChanged}
                // config={{
                //   readonly: false,
                //   uploader: {
                //     insertImageAsBase64URI: true,
                //   },
                // }}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>
            <div className="my-3">
              <Label for="category">Add Category</Label>
              <Input
                type="select"
                id="category"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
              >
                <option value="0">--Select Category--</option>

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
                className="small-button button reset-button"
                color="danger"
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
