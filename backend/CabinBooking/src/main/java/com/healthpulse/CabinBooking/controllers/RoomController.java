package com.healthpulse.CabinBooking.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.healthpulse.CabinBooking.dto.Response;
import com.healthpulse.CabinBooking.services.BookingService;
import com.healthpulse.CabinBooking.services.FileService;
import com.healthpulse.CabinBooking.services.RoomService;


import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/cb/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;
    @Autowired
    private BookingService iBookingService;
    @Autowired
	private FileService fileService;

	@Value("${project.image}")
	private String path;


    @PostMapping("/add")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addNewRoom(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "roomType", required = false) String roomType,
            @RequestParam(value = "roomPrice", required = false) BigDecimal roomPrice,
            @RequestParam(value = "roomDescription", required = false) String roomDescription
    ) {
    	
    	if(photo == null) {
    		Response response = new Response();
    		response.setStatusCode(400);
    		response.setMessage("Please provide a photo");
    		return ResponseEntity.status(response.getStatusCode()).body(response);
    	}
    	
		if (roomType == null || roomType.isBlank()) {
			Response response = new Response();
			response.setStatusCode(400);
			response.setMessage("Please provide a room type");
			return ResponseEntity.status(response.getStatusCode()).body(response);
		}
		
		if (roomPrice == null) {
			Response response = new Response();
			response.setStatusCode(400);
			response.setMessage("Please provide a room price");
			return ResponseEntity.status(response.getStatusCode()).body(response);
		}

//        if (photo == null || photo.isEmpty() || roomType == null || roomType.isBlank() || roomPrice == null || roomType.isBlank()) {
//            Response response = new Response();
//            response.setStatusCode(400);
//            response.setMessage("Please provide values for all fields(photo, roomType,roomPrice)");
//            return ResponseEntity.status(response.getStatusCode()).body(response);
//        }
        Response response = roomService.addNewRoom(photo, roomType, roomPrice, roomDescription);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllRooms() {
        Response response = roomService.getAllRooms();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/room-by-id/{roomId}")
    public ResponseEntity<Response> getRoomById(@PathVariable ("roomId")  Long roomId) {
        Response response = roomService.getRoomById(roomId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-available-rooms")
    public ResponseEntity<Response> getAvailableRooms() {
        Response response = roomService.getAllAvailableRooms();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

//    @GetMapping("/available-rooms-by-date-and-type")
//    public ResponseEntity<Response> getAvailableRoomsByDateAndType(
//            @RequestParam(required = false ) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
//            @RequestParam(required = false ) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
//            @RequestParam(required = false ) String roomType
//    ) {
//        if (checkInDate == null || roomType == null || roomType.isBlank() || checkOutDate == null) {
//            Response response = new Response();
//            response.setStatusCode(400);
//            response.setMessage("Please provide values for all fields(checkInDate, roomType,checkOutDate)");
//            return ResponseEntity.status(response.getStatusCode()).body(response);
//        }
//        Response response = roomService.getAvailableRoomsByDataAndType(checkInDate, checkOutDate, roomType);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }
    
    
    @GetMapping("/available-rooms-by-date-and-type")
    public ResponseEntity<Response> getAvailableRoomsByDateAndType(
            @RequestParam(value = "checkInDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(value = "checkOutDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(value = "roomType", required = false) String roomType
    ) {
        if (checkInDate == null || roomType == null || roomType.isBlank() || checkOutDate == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields(checkInDate, roomType, checkOutDate)");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = roomService.getAvailableRoomsByDataAndType(checkInDate, checkOutDate, roomType);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{roomId}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateRoom(@PathVariable ("roomId")  Long roomId,
                                               @RequestParam(value = "photo", required = false) MultipartFile photo,
                                               @RequestParam(value = "roomType", required = false) String roomType,
                                               @RequestParam(value = "roomPrice", required = false) BigDecimal roomPrice,
                                               @RequestParam(value = "roomDescription", required = false) String roomDescription

    ) {
        Response response = roomService.updateRoom(roomId, roomDescription, roomType, roomPrice, photo);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{roomId}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteRoom(@PathVariable ("roomId") Long roomId) {
        Response response = roomService.deleteRoom(roomId);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }
    
  //method to serve files
    @GetMapping(value = "/image/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(
            @PathVariable("imageName") String imageName,
            HttpServletResponse response
    ) throws IOException {

        InputStream resource = this.fileService.getResource(path, imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource,response.getOutputStream())   ;

    }


}