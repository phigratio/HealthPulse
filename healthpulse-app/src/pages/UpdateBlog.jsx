import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../components/Base";
import userContext from "../context/userContext";
import { loadPost, updatePost, uploadPostImage } from "../service/post-service";
import { loadAllCategories } from "../service/category-service";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Container,
} from "reactstrap";
import JoditEditor from "jodit-react";

function UpdateBlog() {
  const { blogId } = useParams();
  const object = useContext(userContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });

    loadPost(blogId)
      .then((data) => {
        setPost({ ...data, categoryId: data.category.categoryId });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading the blog");
      });
  }, [blogId]);

  useEffect(() => {
    if (post && object.user.data.id !== post.user.id) {
      toast.error("This is not your post!");
      navigate("/");
    }
  }, [post, object.user.data.id, navigate]);

  const handleChange = (event, fieldName) => {
    setPost({
      ...post,
      [fieldName]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    uploadPostImage(imageFile, post.postId)
      .then((imageRes) => {
        toast.success("Post banner updated");
      })
      .catch((imageError) => {
        console.log(imageError);
        toast.error("Error updating post banner");
      });
  };

  const updatePostDetails = (event) => {
    event.preventDefault();
    updatePost(
      { ...post, category: { categoryId: post.categoryId } },
      post.postId
    )
      .then((res) => {
        console.log(res);
        toast.success("Post updated successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error updating post");
      });
  };

  const updateHtml = () => (
    <div className="wrapper">
      <Card className="shadow-sm  border-0 mt-2">
        <CardBody>
          <h3>Update Post</h3>
          <Form onSubmit={updatePostDetails}>
            <div className="my-3">
              <Label for="title">Post Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                className="rounded-0"
                name="title"
                value={post.title}
                onChange={(event) => handleChange(event, "title")}
              />
            </div>

            <div className="my-3">
              <Label for="content">Post Content</Label>
              <JoditEditor
                value={post.content}
                onChange={(newContent) =>
                  setPost({ ...post, content: newContent })
                }
              />
            </div>

            <div className="mt-3">
              <Label for="image">Select Post Banner</Label>
              <Input type="file" id="image" onChange={handleImageChange} />
            </div>

            <div className="my-3">
              <Label for="category">Post Category</Label>
              <Input
                type="select"
                id="category"
                className="rounded-0"
                name="categoryId"
                value={post.categoryId}
                onChange={(event) => handleChange(event, "categoryId")}
              >
                <option disabled value={0}>
                  --Select category--
                </option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Update Post
              </Button>
              <Button className="rounded-0 ms-2" color="danger">
                Reset Content
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );

  return <Base>{post && updateHtml()}</Base>;
}

export default UpdateBlog;
