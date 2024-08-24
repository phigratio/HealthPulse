package com.healthpulse.UserSection.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.healthpulse.UserSection.entities.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    
    Optional<UserInfo> findByUserId(int userId);
}
