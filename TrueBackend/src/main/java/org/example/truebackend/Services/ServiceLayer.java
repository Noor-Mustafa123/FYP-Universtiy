package org.example.truebackend.Services;

import org.example.truebackend.Controllers.AuthenticationReponse;
import org.example.truebackend.Models.Login;
import org.example.truebackend.Models.User;
import org.example.truebackend.repositorylayer.RepositoryLayer;
import org.example.truebackend.Models.User1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service

public class ServiceLayer {
    @Autowired
    public RepositoryLayer repoObj;
    @Autowired
    public AuthenticationService authenticationService;
    @Autowired
    public PasswordEncoder passwordEncoder;

    public ServiceLayer() {

    }

    public AuthenticationReponse postMethod(User entityObj) {
        //these are query methods which are taking the object as parameters
        List<User> listOfNames = repoObj.findByFirstName(entityObj.getFirstName());
        List<User> listOfEmails = repoObj.findByEmail(entityObj.getEmail());

        AuthenticationReponse authenticationReponse = new AuthenticationReponse();

        if (!listOfNames.isEmpty() && !listOfEmails.isEmpty()) {
            authenticationReponse.setErrorString("Name and Email already Exists!");
            return authenticationReponse;
        }
        else if (!listOfEmails.isEmpty()) {
            authenticationReponse.setErrorString("This Email is already used");
            return authenticationReponse;
        }
        else if (!listOfNames.isEmpty()) {
            authenticationReponse.setErrorString("This name is already used");
            return authenticationReponse;
        }
        else{
            System.out.println("this else condition is running");
           AuthenticationReponse authenticationEntityObj = authenticationService.registerNewUser(entityObj);
            authenticationEntityObj.setErrorString("Please check your gmail for a confirmation link to approve account creation");
            authenticationEntityObj.setUserEmail(entityObj.getEmail());
            authenticationEntityObj.setUserAddress(entityObj.getAddress());
            return authenticationEntityObj;
        }

    }










//first check the user Object from the database
//    if it exists then use the authenticate user methdo to generete a new user
    public AuthenticationReponse authenticateUser(String email,String password){
//        List of obj with matching emails
        List<User> listOfEmails = repoObj.findByEmail(email);

//set the response authentication response entity to be returned wit hteh set detailos

        AuthenticationReponse authenticationReponse = new AuthenticationReponse();

        if(listOfEmails.isEmpty()){
             authenticationReponse.setErrorString("The Email and password do not exist Please sign up with a new account");
                return authenticationReponse;
        }

        else if (!passwordEncoder.matches(password,listOfEmails.get(0).getPassword())) {
            authenticationReponse.setErrorString("Password is incorrect");
            return authenticationReponse;
        }
        else if(listOfEmails.get(0).getEmail().equals("mustafanoor715@gmail.com")){
            System.out.println(listOfEmails.get(0).getPassword());
            System.out.println(password);
            System.out.println(passwordEncoder.matches(password,listOfEmails.get(0).getPassword()));

            String emailOfUser = listOfEmails.get(0).getEmail();
            String firstName = listOfEmails.get(0).getFirstName();
            String addressOfUser = listOfEmails.get(0).getAddress();
            System.out.println();

            Login loginObj = Login.builder()
                    .email(emailOfUser)
                    .password(password)
                    .build();

            AuthenticationReponse authenticationReponseObjAdmin = authenticationService.authenticateUser(loginObj);
            authenticationReponseObjAdmin.setErrorString("This is an admin");
            System.out.println(authenticationReponseObjAdmin.getRefreshToken());
            System.out.println(authenticationReponseObjAdmin.getJwtToken());
            System.out.println(authenticationReponseObjAdmin.getErrorString());
            return authenticationReponseObjAdmin;
        }
        else {
            // Regular user logic
            User user = listOfEmails.get(0);
            Login loginObj = Login.builder()
                    .email(user.getEmail())
                    .password(password)
                    .build();
            AuthenticationReponse authenticationReponseObjUser = authenticationService.authenticateUser(loginObj);
            String errorString = String.format("Successfully logged in as user - %s - %s", user.getFirstName(), user.getAddress());
            authenticationReponseObjUser.setErrorString(errorString);
            authenticationReponseObjUser.setFirstNameOfUser(user.getFirstName());
            return authenticationReponseObjUser;
        }
}






    public String resetPassword(String email,String password){
//        List of obj with matching emails
        List<User> listOfEmails = repoObj.findByEmail(email);


        if(listOfEmails.isEmpty()){
            return "The Email does not exist in the database";
        }
        else if(listOfEmails.get(0).getEmail().equals(email)){
            User user = listOfEmails.get(0);
            user.setPassword(password);
            repoObj.save(user);
            return "The password has been reset successfully";
        }
        else {
            return "there is an error in the database";
        }
    }

}


//TODO: make noor mustafa in the database as admin and the only one to be able to access the admin panel