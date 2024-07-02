//post_service.js

import { myAxios } from "./helper";

//create post function
export const createPost = (postData) => {
    return myAxios.post('/user/${postData.userID}/category/${postData.categoryId}/posts', postData).then((response) => response.data);
  
};
