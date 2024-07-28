//post_service.js

import { privateAxios, myAxios } from "./helper";

//create post function
export const createPost = (postData) => {
  console.log(postData);
  console.log("This is postData.userId: ", postData.userId);
  return privateAxios
    .post(
      `/api/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )

    .then((response) => response.data);
};

export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
    )
    .then((response) => response.data);
};
//delete post
export function deletePostService(postId) {
  return privateAxios.delete(`/api/posts/${postId}`).then((res) => res.data);
}

//load single post of given id
export const loadPost = (postId) => {
  return myAxios.get("/api/posts/" + postId).then((reponse) => reponse.data);
};

//create comment function

// export const createComment = (comment, postId) => {
//   return privateAxios.post(`/api/post/${postId}/comments`, comment);
// };

export const createComment = (comment, postId) => {
  console.log("Creating comment with postId:", postId);
  console.log("Comment data:", comment);

  return privateAxios
    .post(`/api/post/${postId}/comments`, comment)
    .then((response) => {
      console.log("Response data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating comment:", error);
      throw error;
    });
};

//upload post banner image

export const uploadPostImage = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/api/post/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

//get cateory wise posts
export function loadPostCategoryWise(categoryId) {
  return privateAxios
    .get(`/api/category/${categoryId}/posts`)
    .then((res) => res.data);
}

export function loadPostUserWise(userId) {
  return privateAxios.get(`/api/user/${userId}/posts`).then((res) => res.data);
}

//update post
export function updatePost(post, postId) {
  console.log(post);
  return privateAxios
    .put(`/api/posts/${postId}`, post)
    .then((resp) => resp.data);
}
