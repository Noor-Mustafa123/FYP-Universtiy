package org.example.truebackend.Services;

import org.example.truebackend.repositorylayer.RepositoryLayer;
import org.example.truebackend.Models.User1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service

public class ServiceLayer {
    @Autowired
    public RepositoryLayer repoObj;


    public ServiceLayer() {

    }

    public String postMethod(User1 entityObj) {
        //these are query methods which are taking the object as parameters
        List<User1> listOfNames = repoObj.findByFirstName(entityObj.getFirstName());
        List<User1> listOfEmails = repoObj.findByEmail(entityObj.getEmail());
        if (!listOfNames.isEmpty() && !listOfEmails.isEmpty()) {
            return "Name and Email already Exists!";

        }
        else if (!listOfEmails.isEmpty()) {
            return "This Email is already used";
        }
        else if (!listOfNames.isEmpty()) {
            return "This name is already used";
        }
        else{
            repoObj.save(entityObj);
            return "Data saved Successfully";
        }
    }

    public String authenticateUser(String email,String password){
//        List of obj with matching emails
        List<User1> listOfEmails = repoObj.findByEmail(email);
        List<User1> listOfPasswords = repoObj.findByPassword(password);

        if(listOfEmails.isEmpty() && listOfPasswords.isEmpty()){
                return "The Email and password do not exist Please sign up with a new account";
        }
        else if (listOfEmails.isEmpty()) {
                return "Email does not exist";
        }
        else if (listOfPasswords.isEmpty()) {
                return "Password is incorrect";
        }
        else if(listOfEmails.getFirst().getEmail().equals("mustafanoor715@gmail.com")){
            return "This is an admin";
        }
        else {
            String emailOfUser = listOfEmails.getFirst().getEmail();
           String firstName = listOfEmails.getFirst().getFirstName();
           String addressOfUser = listOfEmails.getFirst().getAddress();
            return "Successfully logged in as " + firstName + "-" + emailOfUser + "-" + addressOfUser;
        }
}



}


//TODO: make noor mustafa in the database as admin and the only one to be able to access the admin panel