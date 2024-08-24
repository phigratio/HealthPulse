import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "../Base";
import { Container, Row, Col } from "reactstrap";
import CategorySideMenu from "./CategorySideMenu";
import {
  loadPostCategoryWise,
  deletePostService,
} from "../../service/post-service";
import { toast } from "react-toastify";
import Post from "./Post";
import Background from "../basicComponents/Background";
import "./style/Categories.css";

function Categories() {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0); // State for count animation
  const { categoryId } = useParams();

  useEffect(() => {
    console.log(categoryId);
    loadPostCategoryWise(categoryId)
      .then((data) => {
        setPosts([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading posts");
      });
  }, [categoryId]);

  useEffect(() => {
    let start = 0;
    const end = posts.length;
    if (start === end) return;

    const incrementTime = Math.abs(Math.floor(2000 / end)); // Adjust the duration (2000ms) as needed
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [posts]);

  function deletePost(post) {
    console.log(post);

    deletePostService(post.postId)
      .then((res) => {
        console.log(res);
        toast.success("post is deleted..");
        let newPosts = posts.filter((p) => p.postId !== post.postId);
        setPosts([...newPosts]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in deleting post");
      });
  }

  return (
    <div>
      <Background />
      <Base>
        <div className="mt-24">
          <Container>
            <Row>
              <Col md={2} className="pt-5">
                <CategorySideMenu />
              </Col>
              <Col md={10}>
                <div className="blog-count-container">
                  <h1 className="blog-count">
                    Blogs Count&nbsp;
                    <span className="count-number">{count}</span>
                  </h1>
                </div>

                {posts &&
                  posts.map((post, index) => {
                    return (
                      <Post deletePost={deletePost} key={index} post={post} />
                    );
                  })}

                {posts.length <= 0 ? <h1>No post in this category</h1> : ""}
              </Col>
            </Row>
          </Container>
        </div>
      </Base>
    </div>
  );
}

export default Categories;
