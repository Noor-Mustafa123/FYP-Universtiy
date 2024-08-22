package org.example.truebackend.Controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.mapper.Mapper;
import org.apache.coyote.Response;
import org.example.truebackend.Models.*;
import org.example.truebackend.Services.OrderService;
import org.example.truebackend.Services.ServiceLayer;
import org.example.truebackend.Services.StripeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.HttpRequestHandlerServlet;

import java.util.*;


import static org.springframework.web.servlet.mvc.method.annotation.SseEmitter.event;

@CrossOrigin
@RestController
@RequestMapping("/UserData")
//The error you're encountering is related to Cross-Origin Resource Sharing (CORS), a security feature implemented in web browsers to prevent requests to different domains, protocols, or ports than the one from which the current document originated.  In your case, the JavaScript code running on your page (originating from http://localhost:63342) is trying to fetch data from http://localhost:8080/UserData/PUser1, which is considered a different origin because it's on a different port.
//@CrossOrigin(origins = {"https://fyp-university.000webhostapp.com" , "http://localhost:63342" })
public class ControllerLayer {


    //    INSTANCE VARIABLES
    @Autowired
    private ServiceLayer serviceObj;
    @Autowired
    private ProductResponse productResponse;

    User1 userObj;

    @Autowired
    private StripeService stripeService;

    private UserInfoForStripe userInfo;

    @Autowired
    private OrderService orderService;

    private static final String signingSecret = "whsec_6B7trDNjC8hcBwCxEPoghEKGA0Aaytla";

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



//    ! CURRENTLY WORKING ON THIS USER LOGIN \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//
//    @GetMapping("/login")
//    public ResponseEntity<AuthenticationReponse> getUserLoginData(@RequestParam String email, @RequestParam String password) {
//        AuthenticationReponse loginMethodOutput = serviceObj.authenticateUser(email, password);
//        return ResponseEntity.ok(loginMethodOutput);
//    }


//    ! CURRENTLY WORKING ON THIS USER LOGIN   /////////////////////////////////







//     CURRENTLY WORKING ON THIS USER REGISTRATION  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//    @PostMapping("/PUser1")
//// This error message is indicating that the method is expecting a return type of String, but it's actually returning a ResponseEntity<String>.
//    public ResponseEntity<String> postMethod(@RequestBody User1 UserObj) {
//
//        this.userObj = UserObj;
//        String postMethodOutput = serviceObj.postMethod(UserObj);
//
////  In this code, ResponseEntity.ok(result) creates a ResponseEntity with a 200 OK status and the result string as the body. The @PostMapping annotation is used to map HTTP POST requests onto this method. The @RequestBody annotation is used to bind the HTTP request body with a domain object in method parameter.
//        return ResponseEntity.ok(postMethodOutput);
////   The ResponseEntity class in Spring Framework is used to represent the entire HTTP response. You can control anything that goes into it: status code, headers, and body.
//
//    }


//     CURRENTLY WORKING ON THIS USER REGISTRATION    //////////////////////////////////



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
// ProductCreateParams.builder() is creating a new instance of ProductCreateParams.Builder, which you can then use to set the properties of a new ProductCreateParams object and create it with the build method.
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


//Created this DTO to transfer data as a response this is an empty dto class which i am sending back as a response
            productResponse.setId(productObj.getId());
            productResponse.setName(productObj.getName());
            productResponse.setDescription(productObj.getDescription());
            productResponse.setPriceId(price.getId());


            return ResponseEntity.ok(productResponse);

        } catch (StripeException e) {
            logger.error("An error occurred: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


/////    TODO: DOUBT why am i creating two headers? understand how the request is being sent?

    @PostMapping("/Stripe/Authenticate")
    public ResponseEntity<String> stripeMethod(@RequestBody UserInfoForStripe userInfo) {
//     creating object to add parameter

// The SessionCreateParams.builder() method is a static factory method that returns an instance of the Builder class, which is a static inner class of SessionCreateParams.
// FIXME: NOTE: this is a static factory method which is used to create another class "NOT" a factory object creational design pattern
//  In Java, a static factory method is a static method that returns an instance of the class it's defined in or an instance of another class. The key characteristic of a static factory method is that it's a static method that creates and returns an object.
        SessionCreateParams.Builder parameters = SessionCreateParams.builder()
//                these parameter are getting values from static methods
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("https://66c772aeff6a2414490f16f2--astonishing-blancmange-fd3bca.netlify.app/index.html")
                .setCancelUrl("https://66c772aeff6a2414490f16f2--astonishing-blancmange-fd3bca.netlify.app/FYP%20Project/ErrorPage.html");
//                use a foreach loop to iterate over each object in the list


//        FIXME: there is a error in the product total on the stripe page it does not add the quantity of the items in the total meaning that it does not add more items in the total just single product price
        for (EachProductInADC item : userInfo.getItems()) {
            logger.info("This is the item name {} and amount for the product to be saved {}", item.getItemName(), item.getItemQuantity());
            parameters.addLineItem(
                    SessionCreateParams.LineItem.builder()
                            .setPrice(item.getProductId())
                            .setQuantity(item.getItemQuantity())
                            .build());
        }
        // FIXME: Note: this is a static factory method which is used to create another class "NOT" a factory object creational design
//In Java, a static factory method is a static method that returns an instance of the class it's defined in or an instance of another class. The key characteristic of a static factory method is that it's a static method that creates and returns an object.
        SessionCreateParams newParametersObj = parameters.build();
        try {
//        The Session.create(params) call is used to create a new session with the specified parameters. This call communicates with the Stripe API and returns a Session object.
            Session sessionObj = Session.create(newParametersObj);

//        I will only save the userData in the database only if  the payment intent is completed
//
            this.userInfo = userInfo;
            System.out.println("User Data Recieved");
//         The Session object is then converted to a JSON string using the toJson() method.
            return ResponseEntity.ok(sessionObj.toJson());
        } catch (StripeException e) {
            logger.error("An error occurred: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
//this is a test comment

    //    I have activated the endpoint as a webhook
//    now i make a controleller method that when i locally trigger an event in case of that specific event that method dosee that specific thing
    @PostMapping("/webhook")
    public void paymentSuccessEventHandler(@RequestBody String payload, HttpServletRequest request) {
        String headerSignature = request.getHeader("Stripe-Signature");
        Event event = null;
        try {
            event = Webhook.constructEvent(payload, headerSignature, signingSecret);
//            System.out.println(event);
        } catch (SignatureVerificationException e) {
            logger.error("this is the authentication error in the webhook event creating ", e);
            throw new RuntimeException(e);
        } catch (Exception e) {
            logger.error("this is the exception occurred while creating an event ", e);
        };
//TODO: replace the runtime exceptions with the real response entity expetions so that if real the end user can see them


        try {
//            THREE EVENTS are taking place so only one is accepted other ones are ignored
            if (event.getType().equals("payment_intent.succeeded")) {
                stripeService.saveUserInfoOnOrder(userInfo);
                PaymentIntent PaymentIntent = (PaymentIntent) event.getData().getObject();
                System.out.println(PaymentIntent.toString());
                System.out.println("User Data Saved");
            } else {
                System.out.println("Other events ignored, Event type:" +event.getType());
            }
        } catch (Exception e) {
            logger.error("AN exception occurred in the if else statement", e);
        }

//        then get the object from the session?
//        then save the data
//        why are we returning a response entity and to whom?

    }
    @GetMapping("/OrderDetails")
    public ResponseEntity<String> OrderDetailsMethod() {
        System.out.println("The order details controller method has been hit sucessfully");
          String ordersJson =  orderService.processOrders();
//   FIXME: the items value i am getting is empty find the reason for that
        logger.info("This is the object that we are getting to send back to the client {}", ordersJson);
          return ResponseEntity.ok(ordersJson);
    }





    @PostMapping("/resetPassword")
 public ResponseEntity<String> passwordResetFunction(@RequestBody PasswordResetModal ResetModal) {

   String Email = ResetModal.getEmail();
   String Password = ResetModal.getPassword();

  String serviceResponseString =  serviceObj.resetPassword(Email,Password);
   return ResponseEntity.ok(serviceResponseString);



    }

    //adding a test methdo in the controller layer for testing the spring security
    @PostMapping("/testMethod")
    public ResponseEntity<Void> testMethod(){
        System.out.println("the test method in the controllerlayer of fyp is hitting");
        return ResponseEntity.ok(null);
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