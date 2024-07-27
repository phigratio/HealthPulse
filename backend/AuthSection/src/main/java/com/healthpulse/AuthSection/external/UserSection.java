package com.healthpulse.AuthSection.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.healthpulse.AuthSection.entity.UserInfo;

@FeignClient(name="USER-SECTION")
public interface UserSection {
	
	@PostMapping("/user/{id}")
	UserInfo createUser(@RequestBody UserInfo values, @PathVariable("id") String id);
}
