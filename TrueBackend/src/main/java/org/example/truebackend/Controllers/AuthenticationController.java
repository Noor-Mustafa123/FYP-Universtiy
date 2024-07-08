package org.example.truebackend.Controllers;

import jakarta.transaction.Transactional;
import org.example.truebackend.Models.*;
import org.example.truebackend.Services.ServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.truebackend.repositorylayer.TokenRepository;
import org.example.truebackend.Services.AuthenticationService;
import org.example.truebackend.Services.JwtTokenService;

import java.util.ArrayList;

import static org.example.truebackend.Models.Role.USER;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = {"https://fyp-university.000webhostapp.com" , "http://localhost:63342" , "https://fyp-universtiy-production.up.railway.app"})
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private Login loginObj;
    @Autowired
    TokenRepository tokenRepo;
    @Autowired
    JwtTokenService jwtTokenService;
    @Autowired
    ServiceLayer serviceLayer;


// ? what do i send back as a response
    @PostMapping("/register")
    public ResponseEntity<AuthenticationReponse> registerNewUser(@RequestBody RegisterEntity request) {

        if(request.getEmail().equals("mustafanoor715@gmail.com")){
            request.setRole(Role.ADMIN);
        }
        else{
            request.setRole(Role.USER);
        }
        System.out.println(request.getFirstName());

        User userObj = User.builder()
                .address(request.getAddress())
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(request.getRole())
                .password(request.getPassword())
                .tokens(new ArrayList<>())
                .build();


        System.out.println(userObj.getTokens());

        AuthenticationReponse responseEntity =  serviceLayer.postMethod(userObj);

//        add the functionality here
        return ResponseEntity.ok(responseEntity);
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
