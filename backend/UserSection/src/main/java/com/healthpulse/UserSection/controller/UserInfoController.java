package com.healthpulse.UserSection.controller;

import com.healthpulse.UserSection.dto.UserInfoDTO;
import com.healthpulse.UserSection.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userinfo")
public class UserInfoController {

    @Autowired
    private UserInfoService userInfoService;

    @PostMapping("/{userId}")
    public ResponseEntity<UserInfoDTO> addUserInfo(@PathVariable ("userId") int userId, @RequestBody UserInfoDTO userInfoDTO) {
        userInfoDTO.setUserId(userId); // Set the userId from the URL to the DTO
        UserInfoDTO createdUserInfo = userInfoService.addUserInfo(userInfoDTO);
        return ResponseEntity.ok(createdUserInfo);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserInfoDTO> updateUserInfo(@PathVariable ("userId") int userId, @RequestBody UserInfoDTO userInfoDTO) {
        UserInfoDTO updatedUserInfo = userInfoService.updateUserInfo(userId, userInfoDTO);
        if (updatedUserInfo != null) {
            return ResponseEntity.ok(updatedUserInfo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserInfoDTO> getUserInfoByUserId(@PathVariable ("userId") int userId) {
        UserInfoDTO userInfoDTO = userInfoService.getUserInfoByUserId(userId);
        if (userInfoDTO != null) {
            return ResponseEntity.ok(userInfoDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUserInfoByUserId(@PathVariable ("userId") int userId) {
        userInfoService.deleteUserInfoByUserId(userId);
        return ResponseEntity.noContent().build();
    }
}
