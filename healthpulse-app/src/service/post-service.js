//post_service.js

import { privateAxios } from "./helper";

//create post function
export const createPost = (postData) => {
  console.log(postData);
  console.log("This is postData.userId: ", postData.userId);
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )

    .then((response) => response.data);
};
