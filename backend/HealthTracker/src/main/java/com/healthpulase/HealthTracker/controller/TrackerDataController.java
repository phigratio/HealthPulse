package com.healthpulase.HealthTracker.controller;

import com.healthpulase.HealthTracker.dto.TrackerDataDTO;
import com.healthpulase.HealthTracker.service.TrackerDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/tracker")
public class TrackerDataController {

    @Autowired
    private TrackerDataService trackerDataService;

    @PostMapping
    public ResponseEntity<TrackerDataDTO> addTrackerData(@RequestBody TrackerDataDTO trackerDataDTO) {
        TrackerDataDTO savedData = trackerDataService.addTrackerData(trackerDataDTO);
        return ResponseEntity.ok(savedData);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<TrackerDataDTO> updateTrackerData(@PathVariable ("id") long id, @RequestBody TrackerDataDTO trackerDataDTO) {
//        TrackerDataDTO updatedData = trackerDataService.updateTrackerData(id, trackerDataDTO);
//        return ResponseEntity.ok(updatedData);
//    }
    
    @PutMapping
    public ResponseEntity<TrackerDataDTO> updateTrackerData(@RequestBody TrackerDataDTO trackerDataDTO) {
        TrackerDataDTO updatedData = trackerDataService.updateTrackerData(trackerDataDTO);
        return ResponseEntity.ok(updatedData);
    }

    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrackerData(@PathVariable ("id") long id) {
        trackerDataService.deleteTrackerData(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrackerDataDTO> getTrackerDataById(@PathVariable ("id") long id) {
        TrackerDataDTO trackerData = trackerDataService.getTrackerDataById(id);
        return ResponseEntity.ok(trackerData);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TrackerDataDTO>> getTrackerDataByUserId(@PathVariable ("userId") int userId) {
        List<TrackerDataDTO> trackerDataList = trackerDataService.getTrackerDataByUserId(userId);
        return ResponseEntity.ok(trackerDataList);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<TrackerDataDTO>> getTrackerDataByDate(@PathVariable ("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        List<TrackerDataDTO> trackerDataList = trackerDataService.getTrackerDataByDate(localDate);
        return ResponseEntity.ok(trackerDataList);
    }
    
    @GetMapping("/user/{userId}/date/{date}")
    public ResponseEntity<List<TrackerDataDTO>> getTrackerDataByUserIdAndDate(
            @PathVariable ("userId") int userId, 
            @PathVariable ("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        List<TrackerDataDTO> trackerDataList = trackerDataService.getTrackerDataByUserIdAndDate(userId, localDate);
        return ResponseEntity.ok(trackerDataList);
    }
    
    @GetMapping("/user/{userId}/last7days")
    public ResponseEntity<List<TrackerDataDTO>> getTrackerDataLast7Days(@PathVariable("userId") int userId) {
        List<TrackerDataDTO> trackerDataList = trackerDataService.getTrackerDataLast7Days(userId);
        return ResponseEntity.ok(trackerDataList);
    }

    @GetMapping("/user/{userId}/last30days")
    public ResponseEntity<List<TrackerDataDTO>> getTrackerDataLast30Days(@PathVariable("userId") int userId) {
        List<TrackerDataDTO> trackerDataList = trackerDataService.getTrackerDataLast30Days(userId);
        return ResponseEntity.ok(trackerDataList);
    }

    @GetMapping("/user/{userId}/last365days")
    public ResponseEntity<List<TrackerDataDTO>> getTrackerDataLast365Days(@PathVariable("userId") int userId) {
        List<TrackerDataDTO> trackerDataList = trackerDataService.getTrackerDataLast365Days(userId);
        return ResponseEntity.ok(trackerDataList);
    }

}