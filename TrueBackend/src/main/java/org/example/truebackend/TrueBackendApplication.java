package org.example.truebackend;

import com.stripe.Stripe;
import org.example.truebackend.Controllers.ControllerLayer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrueBackendApplication {

    public static void main(String[] args) {
        Stripe.apiKey = "sk_test_51OzjOa03YcH2K12qrrOmhM1qo5Xumk3NbQfpBQCJfJ7ROQ0whGIoZ68xIplVRXtPWH5o4JoAqAy3HF8Vy7Zgxrse00l9bGziJm";
        SpringApplication.run(TrueBackendApplication.class, args);



    }
}
