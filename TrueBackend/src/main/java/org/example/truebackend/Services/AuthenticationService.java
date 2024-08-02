package org.example.truebackend.Services;

import org.example.truebackend.Controllers.AuthenticationReponse;
import org.example.truebackend.repositorylayer.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.truebackend.Models.*;
import org.example.truebackend.repositorylayer.TokenRepository;

import java.util.*;


@Service
public class AuthenticationService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenService jwtService;
    @Autowired
    private AuthenticationReponse authenticationReponse;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private TokenRepository tokenRepo;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private ConfirmationTokenService confirmationTokenService;




    // method to extract data from the request and create user entity object
    // use that object to create a token
    // method to save user to the database
    // create an entity named token which will have a one-to-many relationship with user entity then save both to the datbase

    public AuthenticationReponse registerNewUser(User userObj) {



        var token = jwtService.generatedToken(userObj);
        var refreshToken = jwtService.generateRefreshToken(userObj);
        int length = refreshToken.length();
        System.out.println("The length of the string is: " + length);


//        Creating a random string
          Date createdDate = new Date();
          String  confirmationToken = UUID.randomUUID().toString();


        //        creating the object of the token entity to save it
        var TokenObj = TokenEntity.builder()
                .user(userObj)
                .revoked(false)
                .expired(false)
                .token(token)
                .tokenType(TokenType.BEARER)
                .refreshToken(refreshToken)
                .confirmationToken(confirmationToken)
                .build();

        System.out.println(userObj);
        userObj.getTokens().add(TokenObj);
        userRepo.save(userObj);

        authenticationReponse.setJwtToken(token);
        authenticationReponse.setRefreshToken(refreshToken);

        System.out.println("hello this print is working");
        System.out.println(authenticationReponse.getJwtToken());

        tokenRepo.save(TokenObj);

   // adding system to send mail to the user
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
                simpleMailMessage.setCc("assassin6180@gmail.com");
                simpleMailMessage.setTo(userObj.getEmail());
                simpleMailMessage.setSubject("Account Confirmation Mail");
                simpleMailMessage.setText("To confirm your account, please click here : " + "https://fyp-universtiy-production.up.railway.app/api/v1/auth/confirm-account?token="+confirmationToken);

        confirmationTokenService.sendEmail(simpleMailMessage);

        return authenticationReponse;

    }


    // ! make a method that uses the authorization provider in order to check the user and authenticate it
    // ? AuthenticationManager: This is the main entry point for the authentication process. When you call authenticationManager.authenticate(...), it delegates the actual authentication process to the configured AuthenticationProvider.
    public AuthenticationReponse authenticateUser(Login loginRequest) {
// In the authenticateUser method, the user is first authenticated using the AuthenticationManager. The AuthenticationManager authenticates the user by checking the provided username and password. If the authentication is successful, an Authentication object is created which contains the user's details and authorities.
        Authentication authObj = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        System.out.println("This boolean shows that wether the user is authenticated");
       System.out.println(authObj.isAuthenticated());

// ! create a new branch
//        get the users details from the database matching and generet tokens and return it to the user
        Optional<List<User>> userListOptional = Optional.of(userRepo.findByEmail(loginRequest.getEmail()));

//       The orElse method returns the value present inside the Optional if it's non-empty, otherwise it returns the value provided in the orElse method.
           List<User> userList = userListOptional.orElse(Collections.emptyList());



        if(userList.isEmpty()){
            authenticationReponse.setErrorString("The Email and password do not exist Please sign up with a new account");
            return authenticationReponse;
        }

       User user = userList.get(0);

        String jwtToken = jwtService.generateToken(user);
        String jwtRefreshToken = jwtService.generateRefreshToken(user);

        System.out.println(jwtRefreshToken);

        revokeUserToken(user);
        saveUserToken(user, jwtToken, jwtRefreshToken);


        return AuthenticationReponse.builder()
                .jwtToken(jwtToken)
                .refreshToken(jwtRefreshToken)
                .build();
    }


    public void saveUserToken(User userObj, String token, String refreshToken) {
        TokenEntity tokenEntity = TokenEntity.builder()
                .user(userObj)
                .token(token)
                .refreshToken(refreshToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepo.save(tokenEntity);
    }

    public void revokeUserToken(User user) {
        List<TokenEntity> validTokens = tokenRepo.findAllValidTokenByUser(user.getId());

        if (validTokens.isEmpty()) {
            return;
        }
        validTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepo.saveAll(validTokens);

    }




//    TODO: to make the token entity so that i can save the data to the database
//    TODO: to make method to save the data to the database
//    TODO: to make repository classes











}


