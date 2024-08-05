package org.example.truebackend.Config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.net.InetAddress;

@Component
public class ApplicationStartup implements ApplicationListener<ApplicationReadyEvent> {

    //   The Environment interface in Spring Boot is a way to programmatically access the same properties that you define in your application.properties or application.yml files.
    @Autowired
    public Environment environment;


    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {

//        this is the short form for a condition the ? and the if else values
        String protocol = environment.getProperty("server.ssl.key-store") != null ? "https" : "http";
//        the default value is used if the key matching value is not present in teh environment
        String port = environment.getProperty("server.port", "8080");
//        the context path if the application in th environment is present with other applications it is used to access that application using the path known as context path
        String contextPath = environment.getProperty("server.servlet.context-path", "/");

        if (!contextPath.startsWith("/")) {
            contextPath = "/" + contextPath;
        }

        String hostName = "localhost";

//        We are using try catch because we cannot use if else because there is no condition to check there is an error or the defalut value

        try {
            hostName = InetAddress.getLocalHost().getHostAddress();
        } catch (Exception e) {
            System.out.println("the is is a host error" + e.getMessage());
        }


        System.out.println("\n----------------------------------------------------------");
        System.out.println("Application is running! Access URLs:");
        System.out.println("Local: \t\t" + protocol + "://localhost:" + port + contextPath);
        System.out.println("External: \t" + protocol + "://" + hostName + ":" + port + contextPath);
        System.out.println("----------------------------------------------------------");


    }
}

