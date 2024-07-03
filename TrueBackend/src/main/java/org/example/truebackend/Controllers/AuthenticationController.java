<<<<<<< HEAD
package org.example.truebackend.Controllers;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.example.truebackend.Models.Login;
import org.example.truebackend.Models.RegisterEntity;
import org.example.truebackend.Models.TokenEntity;
import org.example.truebackend.Models.User;
import org.example.truebackend.repositorylayer.TokenRepository;
import org.example.truebackend.Services.AuthenticationService;
import org.example.truebackend.Services.JwtTokenService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private Login loginObj;
    @Autowired
    TokenRepository tokenRepo;
    @Autowired
    JwtTokenService jwtTokenService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationReponse> registerNewUser(@RequestBody RegisterEntity request) {
        return ResponseEntity.ok(authenticationService.registerNewUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationReponse> loginUser(@RequestBody Login loginObj) {
        return ResponseEntity.ok(authenticationService.authenticateUser(loginObj));
    }


    @PostMapping("/refresh")
    @Transactional
    public ResponseEntity<AuthenticationReponse> refreshOldToken(@RequestBody RefreshDAO refreshEntity) throws Exception {
        //validate the token?
        System.out.println("refresh contorller was hit");

        TokenEntity tokenObj = jwtTokenService.isTokenValid(refreshEntity.refreshToken);
        if (!tokenObj.refreshToken.equals(refreshEntity.refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
//        get the user related to the token
        User user = tokenObj.getUser();
//        generete a new token
        String newToken = jwtTokenService.generatedToken(user);
        String newRefreshToken = jwtTokenService.generateRefreshToken(user);
//        send it bcak as a response
        return ResponseEntity.ok(AuthenticationReponse.builder()
                .refreshToken(newRefreshToken)
                .jwtToken(newToken)
                .build());
    }


}
=======
package org.example.truebackend.Controllers;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.example.truebackend.Models.Login;
import org.example.truebackend.Models.RegisterEntity;
import org.example.truebackend.Models.TokenEntity;
import org.example.truebackend.Models.User;
import org.example.truebackend.repositorylayer.TokenRepository;
import org.example.truebackend.Services.AuthenticationService;
import org.example.truebackend.Services.JwtTokenService;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private Login loginObj;
    @Autowired
    TokenRepository tokenRepo;
    @Autowired
    JwtTokenService jwtTokenService;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationReponse> registerNewUser(@RequestBody RegisterEntity request) {
        return ResponseEntity.ok(authenticationService.registerNewUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationReponse> loginUser(@RequestBody Login loginObj) {
        return ResponseEntity.ok(authenticationService.authenticateUser(loginObj));
    }


    @PostMapping("/refresh")
    @Transactional
    public ResponseEntity<AuthenticationReponse> refreshOldToken(@RequestBody RefreshDAO refreshEntity) throws Exception {
        //validate the token?
        System.out.println("refresh contorller was hit");

        TokenEntity tokenObj = jwtTokenService.isTokenValid(refreshEntity.refreshToken);
        if (!tokenObj.refreshToken.equals(refreshEntity.refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
//        get the user related to the token
        User user = tokenObj.getUser();
//        generete a new token
        String newToken = jwtTokenService.generatedToken(user);
        String newRefreshToken = jwtTokenService.generateRefreshToken(user);
//        send it bcak as a response
        return ResponseEntity.ok(AuthenticationReponse.builder()
                .refreshToken(newRefreshToken)
                .jwtToken(newToken)
                .build());
    }


}
>>>>>>> origin/main
