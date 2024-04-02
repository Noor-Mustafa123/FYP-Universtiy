package org.example.truebackend.Controllers;



import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.apache.coyote.Response;
import org.example.truebackend.Models.ProductResponse;
import org.example.truebackend.Models.User1;
import org.example.truebackend.Models.UserInfoForStripe;
import org.example.truebackend.Models.itemInfo;
import org.example.truebackend.Services.ServiceLayer;
import org.example.truebackend.Services.StripeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/UserData")
//The error you're encountering is related to Cross-Origin Resource Sharing (CORS), a security feature implemented in web browsers to prevent requests to different domains, protocols, or ports than the one from which the current document originated.  In your case, the JavaScript code running on your page (originating from http://localhost:63342) is trying to fetch data from http://localhost:8080/UserData/PUser1, which is considered a different origin because it's on a different port.
@CrossOrigin(origins = "http://localhost:63342")
public class ControllerLayer {

    //    INSTANCE VARIABLES
    @Autowired
    private ServiceLayer serviceObj;
    @Autowired
    private ProductResponse productResponse;

    User1 userObj;

    @Autowired
    private StripeService stripeService;



/////////////////////////////////////////////////////////
//    FOR BETTER ERROR LOGGING AND MORE ROBUST IMPORT A LIBRARY

//    The Factory Pattern is about creating an object from one of several possible classes that share a common super class or interface, based on some input parameters. It’s useful when you don’t know ahead of time what class object you need
//    The Builder Pattern, on the other hand, is about constructing a complex object step by step. It’s particularly useful when an object needs to be created with many possible configuration
  private static final Logger logger = LoggerFactory.getLogger(ControllerLayer.class);



    // the parameter in the getmapping is a path vairable which allows you to pass
// a value directly from the path into a method parameter
    @GetMapping("{User1}")
    public User1 getIdFromUser1(@PathVariable String User1) {
        return userObj;
//   return new User1(1,"Noor","mustafanoor715@gmail.com");
    }

    @GetMapping("/login")
    public ResponseEntity<String> getUserloinData(@RequestParam String email, @RequestParam String password) {
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




    @PostMapping("/Stripe/AddProduct")
    public ResponseEntity<ProductResponse> addNewProduct(@RequestBody itemInfo itemInfo) {
        try {
            ProductCreateParams Parameters = ProductCreateParams.builder()
                    .setName(itemInfo.getProductName())
                    .setDescription(itemInfo.getProductDesc())
                    .build();
            Product productObj = Product.create(Parameters);

            PriceCreateParams priceParams = PriceCreateParams.builder()
                    .setUnitAmount(itemInfo.getProductPrice())
                    .setCurrency("usd")
                    // use the ID of the product you just created
                    .setProduct(productObj.getId())
                    .build();

            Price price = Price.create(priceParams);


//Created this DTO to transfer data as a response
            productResponse.setId(productObj.getId());
            productResponse.setName(productObj.getName());
            productResponse.setDescription(productObj.getDescription());
            productResponse.setPriceId(price.getId());


            return ResponseEntity.ok(productResponse);

        }
        catch (StripeException e) {
            logger.error("An error occurred: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }







/////    TODO: DOUBT why am i creating two headers? understand how the request is being sent?

    @PostMapping("/Stripe/Authenticate")
    public ResponseEntity<String> stripeMethod(@RequestBody UserInfoForStripe userInfo) throws StripeException {
//     creating object to add parameter
        SessionCreateParams parameters = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://http://localhost:63342/FYP-Universtiy/FYP%20Project/index.html")
                .setCancelUrl("http://localhost:63342/FYP-Universtiy/FYP%20Project/login.html")
//              TODO:  the line items to send to the stripe api to autenticate against is missing hardcoded one for testing purposes
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice("price_1P0EoP03YcH2K12qnyAv7O5s")
                                .setQuantity(1L)
                                .build())
                .build();
        try {
//        The Session.create(params) call is used to create a new session with the specified parameters. This call communicates with the Stripe API and returns a Session object.
        Session sessionObj = Session.create(parameters);
        stripeService.saveUserInfoOnOrder(userInfo);

//         The Session object is then converted to a JSON string using the toJson() method.
        return ResponseEntity.ok(sessionObj.toJson());
        }
        catch (StripeException e){
            logger.error("An error occurred: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }




}
//TODO: currently just trying to get the link from the api to redirect to the payment page

//Create a header for the request and add api key to it in the authenticaion field
//Create the request
//send the post request

//   SessionCreateParams params =
//                SessionCreateParams.builder()
//                        .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
//                        .setMode(SessionCreateParams.Mode.PAYMENT)
//                        .setSuccessUrl("http://localhost:63342/FYP-Universtiy/FYP%20Project/index.html")
//                        .setCancelUrl("http://localhost:63342/FYP-Universtiy/FYP%20Project/index.html")
//                        .addLineItem(
//                                SessionCreateParams.LineItem.builder()
//                                        .setPrice("price_1P0EoP03YcH2K12qnyAv7O5s")
//                                        .setQuantity(1L)
//                                        .build())
//                        .build();
//
//        Session session = Session.create(params);
//        return ResponseEntity.ok(session.toJson());
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