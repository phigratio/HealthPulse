import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { loadAllPosts, deletePostService } from "../../service/post-service";
import { toast } from "react-toastify";
import Post from "./Post";
import "./style/NewFeed.css"; // Ensure this file includes the necessary CSS

const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    let start = 0;
    const end = postContent.totalElements;
    if (start === end) return;

    const incrementTime = Math.abs(Math.floor(2000 / end)); // Adjust the duration (2000ms) as needed
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [postContent.totalElements]);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0) {
      return;
    }
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
        });
      })
      .catch((error) => {
        toast.error("Error in loading posts");
      });
  };

  function deletePost(post) {
    deletePostService(post.postId)
      .then((res) => {
        toast.success("Post is deleted.");
        const newPostContents = postContent.content.filter(
          (p) => p.postId !== post.postId
        );
        setPostContent({ ...postContent, content: newPostContents });
      })
      .catch((error) => {
        toast.error("Error in deleting post");
      });
  }

  const changePageInfinite = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid">
      <Row className="justify-content-center">
        <Col md={{ size: 12 }} className="mx-auto">
          <div className="blog-count-container">
            <h1 className="blog-count">
              Blogs Count&nbsp;
              <span className="count-number">{count}</span>
            </h1>
          </div>
          <InfiniteScroll
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {postContent.content.map((post, index) => (
              <Post deletePost={deletePost} post={post} key={index} />
            ))}
          </InfiniteScroll>
        </Col>
      </Row>
    </div>
  );
};

export default NewFeed;
