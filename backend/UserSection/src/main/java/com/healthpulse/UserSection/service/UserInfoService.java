package com.healthpulse.UserSection.service;

import java.util.List;

import com.healthpulse.UserSection.dto.UserInfoDTO;

public interface UserInfoService {

    UserInfoDTO addUserInfo(UserInfoDTO userInfoDTO);
    
    UserInfoDTO updateUserInfo(int userId, UserInfoDTO userInfoDTO);
    
    UserInfoDTO getUserInfoByUserId(int userId);

    void deleteUserInfoByUserId(int userId);
    
    List<UserInfoDTO> getUsersReadyToDonateBlood();
    
    List<UserInfoDTO> getUserInfoByBloodGroupAndReadyToDonate(String bloodGroup);
    
    List<UserInfoDTO> getUserInfoByBloodGroupReadyToDonateAndDistrict(String bloodGroup, String district);
}
