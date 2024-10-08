package com.example.ApiGateway.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {


	private String secret = "jwtTokenKeyMaybetheSecretKeyShouldBeStoredInEnvFileOrInDBOrInSomeSecurePlaceInProductionEnvironmentItMustNotBeHardCodedHereItIsJustForDemoPurposeSoItIsHardCodedHereForDemoPurposeOnly";



    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }



    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
	
	
	
	

}