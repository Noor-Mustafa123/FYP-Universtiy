package org.example.truebackend.Controllers;


import org.example.truebackend.Models.User1;
import org.example.truebackend.Services.ServiceLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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

@GetMapping("/login")
public ResponseEntity<String> getUserloinData(@RequestParam String email, @RequestParam String password){
    String loginMethodOutput = serviceObj.authenticateUser(email, password);
    return ResponseEntity.ok(loginMethodOutput);
}


    @PostMapping("/PUser1")
// This error message is indicating that the method is expecting a return type of String, but it's actually returning a ResponseEntity<String>.
    public ResponseEntity<String> postMethod(@RequestBody User1 UserObj) {
        this.userObj = UserObj;
        String postMethodOutput = serviceObj.postMethod(UserObj);

//  In this code, ResponseEntity.ok(result) creates a ResponseEntity with a 200 OK status and the result string as the body. The @PostMapping annotation is used to map HTTP POST requests onto this method. The @RequestBody annotation is used to bind the HTTP request body with a domain object in method parameter.
        return ResponseEntity.ok(postMethodOutput);
//   The ResponseEntity class in Spring Framework is used to represent the entire HTTP response. You can control anything that goes into it: status code, headers, and body.

    }


    //    Update mapping
    @PutMapping("/UpUser1")
//Yes, the instance variable names in the object do need to match the keys in the JSON body of the HTTP request when using the @RequestBody annotation in Spring Boot.
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



//////////////////////////////////////////////
// Yes, you've got the flow mostly correct. Here's a step-by-step breakdown:
//1 The client (JavaScript running in the browser) sends an HTTP request to the server. This request includes a body which contains the data to be sent to the server.
//2 The server receives this request. In your Spring Boot application, the @PostMapping method in your ControllerLayer class handles this request.
//3 The @RequestBody annotation in the method parameter tells Spring to bind the incoming HTTP request body to the UserObj parameter. This means that the data in the request body is used to create a new User1 object.
//4 The postMethod of the ServiceLayer is then called with this UserObj as an argument. This method interacts with the database and returns a String message.
//5 This String message is then wrapped in a ResponseEntity object and returned from the postMethod in the ControllerLayer. The ResponseEntity represents the entire HTTP response, including the status code, headers, and body.
//6 This HTTP response is sent back to the client. The body of the response contains the String message.
//8 Back in the JavaScript code, the fetch function receives this HTTP response. The fetch function returns a Promise that resolves to a Response object.
//9 The first then function is called with this Response object. Inside this function, response.text() is called to read the body of the response as text. This returns another Promise because the body content might be coming in bit by bit over the network.
//10 The second then function is called when the text content of the response is available. Inside this function, you have access to the text content of the response.