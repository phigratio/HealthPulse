package com.healthpulse.website.services;

import java.io.FileNotFoundException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
	String uploadImage(String path, MultipartFile file) throws IOException;

	InputStream getResource(String path, String fileName) throws FileNotFoundException;

}