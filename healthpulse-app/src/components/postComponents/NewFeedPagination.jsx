import React, { useState, useEffect } from "react";
import { loadAllPosts, deletePostService } from "../../service/post-service";
import { toast } from "react-toastify";
import Post from "./Post";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style/NewFeedPagination.css"; // Import the CSS file

const NewFeedPagination = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    lastPage: false,
    pageNumber: 0,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0); // State for animated count

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
    if (pageNumber > postContent.pageNumber && postContent.lastPage) return;
    if (pageNumber < postContent.pageNumber && postContent.pageNumber === 0)
      return;

    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: data.content,
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

  const deletePost = (post) => {
    deletePostService(post.postId)
      .then((res) => {
        toast.success("Post is deleted.");
        let newPostContents = postContent.content.filter(
          (p) => p.postId !== post.postId
        );
        setPostContent({ ...postContent, content: newPostContents });
      })
      .catch((error) => {
        toast.error("Error in deleting post");
      });
  };

  const changePageInfinite = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container-fluid mt-24">
      <Row className="justify-content-center">
        <Col sm="9" className="mx-auto">
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
          <Container className="mt-3">
            <Pagination size="lg">
              <PaginationItem
                onClick={() => changePage(postContent.pageNumber - 1)}
                disabled={postContent.pageNumber === 0}
              >
                <PaginationLink previous>Previous</PaginationLink>
              </PaginationItem>

              {[...Array(postContent.totalPages)].map((item, index) => (
                <PaginationItem
                  onClick={() => changePage(index)}
                  active={index === postContent.pageNumber}
                  key={index}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem
                onClick={() => changePage(postContent.pageNumber + 1)}
                disabled={postContent.lastPage}
              >
                <PaginationLink next>Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default NewFeedPagination;
