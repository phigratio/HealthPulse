package com.healthpulse.UserSection.service;

import com.healthpulse.UserSection.dto.UserInfoDTO;

public interface UserInfoService {

    UserInfoDTO addUserInfo(UserInfoDTO userInfoDTO);
    
    UserInfoDTO updateUserInfo(int userId, UserInfoDTO userInfoDTO);
    
    UserInfoDTO getUserInfoByUserId(int userId);

    void deleteUserInfoByUserId(int userId);
}
