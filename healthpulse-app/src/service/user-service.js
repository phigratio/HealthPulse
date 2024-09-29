import { myAxios, privateAxios } from "./helper";

export const signUp = (user, roleId) => {
  return myAxios
    .post(`/auth/register?roleId=${roleId}`, user)
    .then((response) => response.data);
};

export const login = (loginDetail) => {
  console.log("Login Detail:");
  console.log(loginDetail);
  return myAxios
    .post("/auth/login", loginDetail)
    .then((response) => response.data);
};

export const getUser = (userId) => {
  return myAxios.get(`/users/${userId}`).then((resp) => resp.data);
};

//update post
export function updateProfile(user, userId) {
  console.log(user);
  return privateAxios.put(`/users/${userId}`, user).then((resp) => resp.data);
}

//update profile image

export const uploadProfileImage = (image, userId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/users/user/image/upload/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

//upload CV

export const uploadCV = (cv, userId) => {
  let formData = new FormData();
  formData.append("cv", cv);
  return privateAxios
    .post(`/users/doctor/upload-cv/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

// Upload certificate

export const uploadCertificate = (certificate, userId) => {
  let formData = new FormData();
  formData.append("certificate", certificate);
  return privateAxios
    .post(`/users/doctor/upload-certificate/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

// Function to get user data from local storage
export const getUserData = () => {
  const data = localStorage.getItem("data");
  return data ? JSON.parse(data).user : null;
};

// Function to check if the user is an admin
export const isAdmin = () => {
  const user = getUserData();
  return user && user.roles.some((role) => role.id === 501);
};

// Function to check if the user is a doctor
export const isDoctor = () => {
  const user = getUserData();
  return user && user.roles.some((role) => role.id === 503);
};

// Function to check if the user is a normal user
export const isUser = () => {
  const user = getUserData();
  return user && user.roles.some((role) => role.id === 502);
};

//Function to update doctor info

export const updateDoctorInfo = (formData, userId) => {
  return privateAxios
    .put(`/doctors/update-info/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

// get Pending Doctors

export const getPendingDoctors = () => {
  return privateAxios
    .get(`/doctors/pending-approvals`)
    .then((resp) => resp.data);
};

// Approve Doctor

export const approveDoctor = (doctorId) => {
  return privateAxios
    .put(`/doctors/approve/${doctorId}`)
    .then((resp) => resp.data);
};

// Reject Doctor

export const rejectDoctor = (doctorId) => {
  return privateAxios
    .put(`/doctors/reject/${doctorId}`)
    .then((resp) => resp.data);
};

//Add user info
export const addUserInfo = (userInfo, userId) => {
  return privateAxios
    .post(`/userinfo/${userId}`, userInfo)
    .then((response) => response.data);
};

//get user info

export const getUserInfo = (userId) => {
  return privateAxios.get(`/userinfo/${userId}`).then((resp) => resp.data);
};

//update user info

export const updateUserInfo = (userInfo, userId) => {
  return privateAxios
    .put(`/userinfo/${userId}`, userInfo)
    .then((resp) => resp.data);
};

//get all users who are ready to donate blood

export const getDonors = () => {
  return privateAxios.get(`/userinfo/readyToDonate`).then((resp) => resp.data);
};

//get all users who are ready to donate blood and filter by blood group

export const getDonorsByBloodGroup = (bloodGroup) => {
  return privateAxios
    .get(`/userinfo/readyToDonate/${bloodGroup}`)
    .then((resp) => resp.data);
};

// Fetch user info by blood group, readiness to donate, and district
export const getDonorsByBloodGroupAndDistrict = (bloodGroup, district) => {
  return privateAxios
    .get("/userinfo/search", {
      params: {
        bloodGroup: bloodGroup,
        district: district,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "Error fetching user info by blood group, readiness to donate, and district:",
        error
      );
      throw error;
    });
};

// New signup for the chat server
export const signUpChatServer = (chatData) => {
  return myAxios.post("/chat/signup", chatData);
};


// Forgot Password
export const forgotPassword = (email) => {
  return myAxios
    .post(`/auth/forgot-password/${email}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error occurred while sending password reset link", error);
      throw error;
    });
};

// Reset Password
export const resetPassword = (token, newPassword) => {
  return myAxios
    .post(`/auth/reset-password/${token}/${newPassword}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error occurred while resetting password", error);
      throw error;
    });
};
