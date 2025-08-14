package com.canteen_management.backend.service.impl;

import com.canteen_management.backend.entity.Employee;
import com.canteen_management.backend.repository.EmployeeRepository;
import com.canteen_management.backend.service.JwtService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@AllArgsConstructor
@Service
public class JwtServiceImpl implements JwtService {

    private EmployeeRepository employeeRepository;
    private String secreteKey ;

    public JwtServiceImpl(@Value("${jwt.secret}") String secretKey , EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository ;
        this.secreteKey = getSecreteKey();
    }

    public JwtServiceImpl(){}

    public String generateToken(String employeeEmail) {
        Employee employee= employeeRepository.findByEmail( employeeEmail).get();
        HashMap<String,Object>claims=new HashMap<>();
        claims.put("role", employee.isAdmin());
        return Jwts
                .builder()
                .claims()
                .add(claims)
                .subject( employeeEmail)
                .issuer( employeeEmail)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+60*30*1000))
                .and()
                .signWith(generateKey())
                .compact();
    }

    public SecretKey generateKey(){
        byte[] decodekey = Decoders.BASE64.decode(getSecreteKey());
        return Keys.hmacShaKeyFor(decodekey);
    }

    public String getSecreteKey()
    {
        return this.secreteKey;
    }

    public String extractUserName(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    public String extractUserRole(String token) {
        return extractClaims(token, claims -> claims.get("role", String.class));
    }

    private <T>T extractClaims(String token, Function<Claims,T>claimsResolver ) {
        Claims claims=extractClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractClaims(String token){
        return   Jwts.parser().verifyWith(generateKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isValidToken(String token, String email) {
        final String userName=extractUserName(token);
        return (userName.equals(email) && !isTokenExpired(token));
    }

    public boolean isAdmin(String token) {
        String role = extractUserRole(token);
        return "ADMIN".equals(role);
    }

    private boolean isTokenExpired(String token) {
        return extracExpiration(token).before(new Date());
    }

    private Date extracExpiration(String token) {
        return extractClaims(token,Claims::getExpiration);
    }

    public String extractEmail(String token) {
        return extractUserName(token); 
    }

}
