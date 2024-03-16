package org.example.truebackend.Services;

import org.example.truebackend.Models.RepositoryLayer;
import org.example.truebackend.Models.User1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class ServiceLayer {
    @Autowired
    public RepositoryLayer repoObj;

    public ServiceLayer() {

    }

    public void postMethod(User1 entityObj) {
         repoObj.save(entityObj);
}

}


// i first need to set up the entity class to accept the json data and save it
// create a method of the service layer which calls the method from the repository interface and does a post operation
    //--Define a method named postMethod in your ServiceLayer class.
    //--This method should take a User1 object as a parameter.
    //--Inside this method, call the save method on the RepositoryLayer object, passing the User1 object as an argument
//call both objects in the controllerLayer obj the entity obj and the service obj and call its methods
//parse the data and then use those methods to post it on the database