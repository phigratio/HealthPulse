package com.healthpulse.AuthSection.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthpulse.AuthSection.entity.Role;

public interface RoleRepo  extends JpaRepository<Role, Integer>{

}
