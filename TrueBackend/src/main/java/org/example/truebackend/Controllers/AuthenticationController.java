package org.example.truebackend.Controllers;

import jakarta.transaction.Transactional;
import org.example.truebackend.Models.*;
import org.example.truebackend.Services.ConfirmationTokenService;
import org.example.truebackend.Services.ServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.example.truebackend.repositorylayer.TokenRepository;
import org.example.truebackend.Services.AuthenticationService;
import org.example.truebackend.Services.JwtTokenService;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;

import static org.example.truebackend.Models.Role.USER;

@CrossOrigin(origins = "*")
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
    @Autowired
    ServiceLayer serviceLayer;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    ConfirmationTokenService confirmationTokenService;


//   this is here to hold incoming tokenEntity objects from methods
    TokenEntity tokenObj;


    // ? what do i send back as a response
    @PostMapping("/register")
    public ResponseEntity<AuthenticationReponse> registerNewUser(@RequestBody RegisterEntity request) {

        if (request.getEmail().equals("mustafanoor715@gmail.com")) {
            request.setRole(Role.ADMIN);
        } else {
            request.setRole(Role.USER);
        }
        System.out.println(request.getFirstName());
        String encodedPassword = passwordEncoder.encode(request.getPassword());


        User userObj = User.builder()
                .address(request.getAddress())
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role(request.getRole())
                .password(encodedPassword)
                .tokens(new ArrayList<>())
                .build();



        System.out.println(userObj.getTokens());

        AuthenticationReponse responseEntity = serviceLayer.postMethod(userObj);

//        add the functionality here
        return ResponseEntity.ok(responseEntity);
    }





//     WORK ON THE SECOND API ////////////////////////////////////////////////////////////////////////////

    @PostMapping("/login")
    public ResponseEntity<AuthenticationReponse> getUserLoginData(@RequestBody Login login) {
        String email = login.getEmail();
        String password = login.getPassword();
        AuthenticationReponse loginMethodOutput = serviceLayer.authenticateUser(email, password);
        System.out.println(loginMethodOutput.getJwtToken());
        System.out.println(loginMethodOutput.getErrorString());
        System.out.println(loginMethodOutput.getRefreshToken());
        return ResponseEntity.ok(loginMethodOutput);
    }


    @PostMapping("/refresh")
    @Transactional
    public ResponseEntity<AuthenticationReponse> refreshOldToken(@RequestBody RefreshDAO refreshEntity) throws Exception {
        //validate the token?
        System.out.println("refresh controller was hit");
        try {
           tokenObj = jwtTokenService.isTokenValid(refreshEntity.refreshToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(AuthenticationReponse
                    .builder()
                    .errorString("Session Expired Please Login Again")
                    .build()
            );
        }

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


    @GetMapping("/confirm-account")
public RedirectView emailConfirmation(@RequestParam("token") String confirmationToken){
    try{
      confirmationTokenService.getTokenEntityByConfirmationToken(confirmationToken);
        return new RedirectView("https://66c7649885fd075b547bfd65--admirable-florentine-958c59.netlify.app/FYP%20Project/ConfirmationEmailSucessPage.html");
    }
    catch(Exception e){
        System.out.println(e);
        return new RedirectView("https://66c7649885fd075b547bfd65--admirable-florentine-958c59.netlify.app/FYP%20Project/ErrorPage.html");
        }

    }





}
