package org.example.truebackend.Controllers;

import org.example.truebackend.Models.User1;
import org.example.truebackend.Services.ServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//TODO: learn abou SprintBoot DataJPA and autowiring in springboot

@RestController
@RequestMapping("/UserData")
//The error you're encountering is related to Cross-Origin Resource Sharing (CORS), a security feature implemented in web browsers to prevent requests to different domains, protocols, or ports than the one from which the current document originated.  In your case, the JavaScript code running on your page (originating from http://localhost:63342) is trying to fetch data from http://localhost:8080/UserData/PUser1, which is considered a different origin because it's on a different port.
@CrossOrigin(origins = "http://localhost:63342")
public class ControllerLayer {

    //    INSTANCE VARIABLES
    @Autowired
    private ServiceLayer serviceObj;


    User1 userObj;

    // the parameter in the getmapping is a path vairable which allows you to pass
// a value directly from the path into a method parameter
    @GetMapping("{User1}")
    public User1 getIdFromUser1(@PathVariable String User1) {
        return userObj;
//   return new User1(1,"Noor","mustafanoor715@gmail.com");
    }


    @PostMapping("/PUser1")
    public String postMethod(@RequestBody User1 UserObj) {
        this.userObj = UserObj;
        serviceObj.postMethod(UserObj);

//        System.out.println(x);
        return "User1 resource updated successfully";
// TODO: The controller should call the methods from the service layer and the service layer should call the methods from the repository layer in order to save the data in the database
    }

    //    Update mapping
    @PutMapping("/UpUser1")
    public String updateMethod(@RequestBody User1 UserObj) {
        this.userObj = UserObj;
        return "User1 Data updated successfully";
    }

    //    Delete Method
    @DeleteMapping("{UserId}")
    public String deleteMethod(@PathVariable String UserId) {
        this.userObj = null;
        return " this User1 is deleted";
    }
}







