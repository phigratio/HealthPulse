package com.healthpulse.RatingSection;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(properties = {
	    "eureka.client.enabled=false"
	})
class RatingSectionApplicationTests {

	@Test
	void contextLoads() {
	}

}
