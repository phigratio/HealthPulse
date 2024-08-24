package com.healthpulse.UserSection.service.impl;

import com.healthpulse.UserSection.dto.UserInfoDTO;
import com.healthpulse.UserSection.entities.UserInfo;
import com.healthpulse.UserSection.repositories.UserInfoRepository;
import com.healthpulse.UserSection.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInfoServiceImpl implements UserInfoService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public UserInfoDTO addUserInfo(UserInfoDTO userInfoDTO) {
        UserInfo userInfo = convertToEntity(userInfoDTO);
        UserInfo savedUserInfo = userInfoRepository.save(userInfo);
        return convertToDTO(savedUserInfo);
    }

    @Override
    public UserInfoDTO updateUserInfo(int userId, UserInfoDTO userInfoDTO) {
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findByUserId(userId);
        if (optionalUserInfo.isPresent()) {
            UserInfo userInfo = optionalUserInfo.get();
            updateUserInfoFromDTO(userInfo, userInfoDTO);
            UserInfo updatedUserInfo = userInfoRepository.save(userInfo);
            return convertToDTO(updatedUserInfo);
        }
        return null; // Or throw a custom exception
    }

    @Override
    public UserInfoDTO getUserInfoByUserId(int userId) {
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findByUserId(userId);
        return optionalUserInfo.map(this::convertToDTO).orElse(null);
    }

    @Override
    public void deleteUserInfoByUserId(int userId) {
        Optional<UserInfo> optionalUserInfo = userInfoRepository.findByUserId(userId);
        optionalUserInfo.ifPresent(userInfoRepository::delete);
    }

    private UserInfo convertToEntity(UserInfoDTO userInfoDTO) {
        return UserInfo.builder()
                .id(userInfoDTO.getId())
                .userId(userInfoDTO.getUserId())
                .age(userInfoDTO.getAge())
                .height(userInfoDTO.getHeight())
                .weight(userInfoDTO.getWeight())
                .gender(userInfoDTO.getGender())
                .bloodGroup(userInfoDTO.getBloodGroup())
                .Waist(userInfoDTO.getWaist())
                .Hip(userInfoDTO.getHip())
                .bmi(userInfoDTO.getBmi())
                .bodyFatPercentage(userInfoDTO.getBodyFatPercentage())
                .waistToHipRatio(userInfoDTO.getWaistToHipRatio())
                .calorieNeeds(userInfoDTO.getCalorieNeeds())
                .idealWeight(userInfoDTO.getIdealWeight())
                .waterIntake(userInfoDTO.getWaterIntake())
                .bsa(userInfoDTO.getBsa())
                .proteinNeeds(userInfoDTO.getProteinNeeds())
                .carbNeeds(userInfoDTO.getCarbNeeds())
                .fatNeeds(userInfoDTO.getFatNeeds())
                .muscleMassNeeds(userInfoDTO.getMuscleMassNeeds())
                .boneDensityNeeds(userInfoDTO.getBoneDensityNeeds())
                .metabolicAgeNeeds(userInfoDTO.getMetabolicAgeNeeds())
                .visceralFatNeeds(userInfoDTO.getVisceralFatNeeds())
                .bodyWaterNeeds(userInfoDTO.getBodyWaterNeeds())
                .muscleMass(userInfoDTO.getMuscleMass())
                .boneDensity(userInfoDTO.getBoneDensity())
                .metabolicAge(userInfoDTO.getMetabolicAge())
                .visceralFat(userInfoDTO.getVisceralFat())
                .bodyWater(userInfoDTO.getBodyWater())
                .geneticDisease(userInfoDTO.getGeneticDisease())
                .chronicDisease(userInfoDTO.getChronicDisease())
                .allergies(userInfoDTO.getAllergies())
                .build();
    }

    private UserInfoDTO convertToDTO(UserInfo userInfo) {
        return UserInfoDTO.builder()
                .id(userInfo.getId())
                .userId(userInfo.getUserId())
                .age(userInfo.getAge())
                .height(userInfo.getHeight())
                .weight(userInfo.getWeight())
                .gender(userInfo.getGender())
                .bloodGroup(userInfo.getBloodGroup())
                .waist(userInfo.getWaist())
                .hip(userInfo.getHip())
                .bmi(userInfo.getBmi())
                .bodyFatPercentage(userInfo.getBodyFatPercentage())
                .waistToHipRatio(userInfo.getWaistToHipRatio())
                .calorieNeeds(userInfo.getCalorieNeeds())
                .idealWeight(userInfo.getIdealWeight())
                .waterIntake(userInfo.getWaterIntake())
                .bsa(userInfo.getBsa())
                .proteinNeeds(userInfo.getProteinNeeds())
                .carbNeeds(userInfo.getCarbNeeds())
                .fatNeeds(userInfo.getFatNeeds())
                .muscleMassNeeds(userInfo.getMuscleMassNeeds())
                .boneDensityNeeds(userInfo.getBoneDensityNeeds())
                .metabolicAgeNeeds(userInfo.getMetabolicAgeNeeds())
                .visceralFatNeeds(userInfo.getVisceralFatNeeds())
                .bodyWaterNeeds(userInfo.getBodyWaterNeeds())
                .muscleMass(userInfo.getMuscleMass())
                .boneDensity(userInfo.getBoneDensity())
                .metabolicAge(userInfo.getMetabolicAge())
                .visceralFat(userInfo.getVisceralFat())
                .bodyWater(userInfo.getBodyWater())
                .geneticDisease(userInfo.getGeneticDisease())
                .chronicDisease(userInfo.getChronicDisease())
                .allergies(userInfo.getAllergies())
                .build();
    }

    private void updateUserInfoFromDTO(UserInfo userInfo, UserInfoDTO userInfoDTO) {
        userInfo.setAge(userInfoDTO.getAge());
        userInfo.setHeight(userInfoDTO.getHeight());
        userInfo.setWeight(userInfoDTO.getWeight());
        userInfo.setGender(userInfoDTO.getGender());
        userInfo.setBloodGroup(userInfoDTO.getBloodGroup());
        userInfo.setWaist(userInfoDTO.getWaist());
        userInfo.setHip(userInfoDTO.getHip());
        userInfo.setBmi(userInfoDTO.getBmi());
        userInfo.setBodyFatPercentage(userInfoDTO.getBodyFatPercentage());
        userInfo.setWaistToHipRatio(userInfoDTO.getWaistToHipRatio());
        userInfo.setCalorieNeeds(userInfoDTO.getCalorieNeeds());
        userInfo.setIdealWeight(userInfoDTO.getIdealWeight());
        userInfo.setWaterIntake(userInfoDTO.getWaterIntake());
        userInfo.setBsa(userInfoDTO.getBsa());
        userInfo.setProteinNeeds(userInfoDTO.getProteinNeeds());
        userInfo.setCarbNeeds(userInfoDTO.getCarbNeeds());
        userInfo.setFatNeeds(userInfoDTO.getFatNeeds());
        userInfo.setMuscleMassNeeds(userInfoDTO.getMuscleMassNeeds());
        userInfo.setBoneDensityNeeds(userInfoDTO.getBoneDensityNeeds());
        userInfo.setMetabolicAgeNeeds(userInfoDTO.getMetabolicAgeNeeds());
        userInfo.setVisceralFatNeeds(userInfoDTO.getVisceralFatNeeds());
        userInfo.setBodyWaterNeeds(userInfoDTO.getBodyWaterNeeds());
        userInfo.setMuscleMass(userInfoDTO.getMuscleMass());
        userInfo.setBoneDensity(userInfoDTO.getBoneDensity());
        userInfo.setMetabolicAge(userInfoDTO.getMetabolicAge());
        userInfo.setVisceralFat(userInfoDTO.getVisceralFat());
        userInfo.setBodyWater(userInfoDTO.getBodyWater());
        userInfo.setGeneticDisease(userInfoDTO.getGeneticDisease());
        userInfo.setChronicDisease(userInfoDTO.getChronicDisease());
        userInfo.setAllergies(userInfoDTO.getAllergies());
    }
}
