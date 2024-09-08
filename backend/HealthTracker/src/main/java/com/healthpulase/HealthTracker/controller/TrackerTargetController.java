package com.healthpulase.HealthTracker.controller;

import com.healthpulase.HealthTracker.dto.TrackerTargetDTO;
import com.healthpulase.HealthTracker.service.TrackerTargetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tracker/target")
public class TrackerTargetController {

    @Autowired
    private TrackerTargetService trackerTargetService;

    @PostMapping
    public ResponseEntity<TrackerTargetDTO> saveOrUpdateTrackerTarget(@RequestBody TrackerTargetDTO trackerTargetDTO) {
        TrackerTargetDTO savedTarget = trackerTargetService.saveOrUpdateTrackerTarget(trackerTargetDTO);
        return ResponseEntity.ok(savedTarget);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<TrackerTargetDTO> getTrackerTargetByUserId(@PathVariable("userId") int userId) {
        TrackerTargetDTO trackerTarget = trackerTargetService.getTrackerTargetByUserId(userId);
        return ResponseEntity.ok(trackerTarget);
    }
}
