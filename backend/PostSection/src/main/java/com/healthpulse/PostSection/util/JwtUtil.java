package com.healthpulse.PostSection.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;

public class JwtUtil {

    private static final String SECRET_KEY = "jwtTokenKeyMaybetheSecretKeyShouldBeStoredInEnvFileOrInDBOrInSomeSecurePlaceInProductionEnvironmentItMustNotBeHardCodedHereItIsJustForDemoPurposeSoItIsHardCodedHereForDemoPurposeOnly";

    // Automatically extract the token from the Authorization header
    private static String getTokenFromRequest() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);  // Remove "Bearer " prefix
        } else {
            throw new IllegalStateException("Authorization header is missing or doesn't start with 'Bearer '");
        }
    }

    // Get claims from the token
    private static Claims getClaimsFromToken(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SignatureException e) {
            throw new IllegalStateException("Invalid JWT token");
        }
    }

    // Get claims directly from the request (automatically extract token)
    private static Claims getClaimsFromRequest() {
        String token = getTokenFromRequest();
        return getClaimsFromToken(token);
    }

    // Get the current user ID from claims
    public static Integer getCurrentUserId() {
        Claims claims = getClaimsFromRequest();
        return claims.get("userId", Integer.class);
    }


    // Check if the user is an admin
    public static boolean isAdmin() {
        Claims claims = getClaimsFromRequest();
        List<String> roles = claims.get("roles", List.class);
        return roles != null && roles.contains("ROLE_ADMIN");
    }

    // Check if the user is a doctor
    public static boolean isDoctor() {
        Claims claims = getClaimsFromRequest();
        List<String> roles = claims.get("roles", List.class);
        return roles != null && roles.contains("ROLE_DOCTOR");
    }

    // Check if the user is a normal user
    public static boolean isUser() {
        Claims claims = getClaimsFromRequest();
        List<String> roles = claims.get("roles", List.class);
        return roles != null && roles.contains("ROLE_USER");
    }

    // Check if the current user ID matches the provided ID
    public static boolean isCurrentUser(int id) {
        Claims claims = getClaimsFromRequest();
        Integer userId = claims.get("userId", Integer.class);
        return userId != null && userId.equals(id);
    }
}