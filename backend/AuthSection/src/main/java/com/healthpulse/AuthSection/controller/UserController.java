package com.healthpulse.AuthSection.controller;


import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.healthpulse.AuthSection.payloads.ApiResponse;
import com.healthpulse.AuthSection.payloads.UserDto;
import com.healthpulse.AuthSection.service.FileService;
import com.healthpulse.AuthSection.service.UserService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private FileService fileService;
	
	@Value("${project.image}")
	private String path;

	// POST-create user
	@PostMapping("/")
	public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto userDto) {
		UserDto createUserDto = this.userService.createUser(userDto);
		return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
	}

	// PUT- update user

	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDto userDto, @PathVariable("userId") Integer uid) {
		UserDto updatedUser = this.userService.updateUser(userDto, uid);
		return ResponseEntity.ok(updatedUser);
	}

	//ADMIN
	// DELETE -delete user
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable("userId") Integer uid) {
		this.userService.deleteUser(uid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("User deleted Successfully", true), HttpStatus.OK);
	}

	// GET - user get
	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUsers() {
		return ResponseEntity.ok(this.userService.getAllUsers());
	}

	// GET - user get

	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getSingleUser(@PathVariable ("userId") Integer userId) {
		return ResponseEntity.ok(this.userService.getUserById(userId));
	}
	
	//method to serve files
    @GetMapping(value = "/user/image/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(
            @PathVariable("imageName") String imageName,
            HttpServletResponse response
    ) throws IOException {

        InputStream resource = this.fileService.getResource(path, imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource,response.getOutputStream())   ;

    }
    
    
    @PostMapping("/user/image/upload/{userId}")
    public ResponseEntity<UserDto> uploadUserImage(
            @RequestParam("image") MultipartFile image,
            @PathVariable("userId") Integer userId) throws IOException {

        if (image.isEmpty()) {
            throw new IllegalArgumentException("Image file is missing");
        }

        System.out.println("Received file: " + image.getOriginalFilename());
        UserDto userDto = this.userService.getUserById(userId);

        String fileName = this.fileService.uploadImage(path, image);
        userDto.setImageName(fileName);
        UserDto updatedUser = this.userService.updateUser(userDto, userId);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
    
    
    @PostMapping("/doctor/upload-cv/{userId}")
    public ResponseEntity<UserDto> uploadDoctorCV(
            @RequestParam("cv") MultipartFile cv,
            @PathVariable("userId") Integer userId) throws IOException {

        if (cv.isEmpty()) {
            throw new IllegalArgumentException("CV file is missing");
        }

        String fileName = this.fileService.uploadImage(path, cv);
        UserDto userDto = this.userService.getUserById(userId);
        
        // Update CV path in DoctorInfo
        if (userDto.getDoctorInfo() != null) {
            userDto.getDoctorInfo().setCV(fileName);
        }

        UserDto updatedUser = this.userService.updateUser(userDto, userId);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PostMapping("/doctor/upload-certificate/{userId}")
    public ResponseEntity<UserDto> uploadDoctorCertificate(
            @RequestParam("certificate") MultipartFile certificate,
            @PathVariable("userId") Integer userId) throws IOException {

        if (certificate.isEmpty()) {
            throw new IllegalArgumentException("Certificate file is missing");
        }

        String fileName = this.fileService.uploadImage(path, certificate);
        UserDto userDto = this.userService.getUserById(userId);
        
        // Update certificate path in DoctorInfo
        if (userDto.getDoctorInfo() != null) {
            userDto.getDoctorInfo().setCertificateOfRegistration(fileName);
        }

        UserDto updatedUser = this.userService.updateUser(userDto, userId);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }


}