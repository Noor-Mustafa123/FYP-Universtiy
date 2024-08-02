package org.example.truebackend;

import com.stripe.Stripe;
import org.example.truebackend.Praactice.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication

public class TrueBackendApplication {

//    @Autowired
//    private PracticeService service;
//    @Autowired
//    private StudentRepo studentRepo;


    Logger logger = LoggerFactory.getLogger(TrueBackendApplication.class);
    public static void main(String[] args) {
        System.out.println("the springboot application is running in the main method");
        Stripe.apiKey = "sk_test_51OzjOa03YcH2K12qrrOmhM1qo5Xumk3NbQfpBQCJfJ7ROQ0whGIoZ68xIplVRXtPWH5o4JoAqAy3HF8Vy7Zgxrse00l9bGziJm";
        SpringApplication.run(TrueBackendApplication.class, args);
//        ApplicationContext context = SpringApplication.run(TrueBackendApplication.class, args);
//        TrueBackendApplication application = context.getBean(TrueBackendApplication.class);
//        application.run();
    }


//    public void run() {
//        // Create the PracticeStudentEntity object
//        PracticeStudentEntity studentEntity = new PracticeStudentEntity();
//        studentEntity.setName("Zain");
//        studentEntity.setAge(18);
//
//        // Create the PracticeLaptopEntity object and pass the PracticeStudentEntity object to it
//        PracticeLaptopEntity laptopEntity = new PracticeLaptopEntity();
//        laptopEntity.setBrand("Apple");
//        laptopEntity.setTypeOfLaptop("Working laptop");
//        laptopEntity.setStudent(studentEntity);
//
//        // Set the PracticeLaptopEntity object to the PracticeStudentEntity object
//        studentEntity.setLaptop(laptopEntity);
//
//        // Save both objects using the practiceSaveMethod in PracticeService
////        service.practiceSaveMethod(studentEntity, laptopEntity);
//
////        getting the object student and getting the laptop from it that matches the student name and detials that we get
//        List<PracticeStudentEntity> studentObjGetFromDatabase = studentRepo.findByName("Noor");
//       String studentName = studentObjGetFromDatabase.getFirst().getName();
//       String laptopName = studentObjGetFromDatabase.getFirst().getLaptop().getBrand();
//       logger.info("Student Name is {},the laptop name is {}",studentName,laptopName);
//
//       Orders order1 = new Orders();
//       order1.setItemName("Plastic chair");
//       order1.setItemQuantity(5);
//       order1.setStudentObj(studentEntity);
//
//       Orders order2 = new Orders();
//        order2.setItemName("Curtains");
//        order2.setItemQuantity(10);
//        order2.setStudentObj(studentEntity);
//
//
//        List<Orders> listToBeAdded = new ArrayList<Orders>();
//        listToBeAdded.add(order1);
//        listToBeAdded.add(order2);
//
//
//       studentEntity.setListOfOrders(listToBeAdded);
//
//       try{
//        studentRepo.save(studentEntity);
//        logger.info("Object is saved successfully");
//       }
//       catch(Exception e){
//           logger.info("the object is not saved");
//       }
//
//
//       // getting the order names from the student
//       PracticeStudentEntity studentWithOrdersObj = studentRepo.findByName("Qalbe").getFirst();
//     String stName = studentWithOrdersObj.getName();
//     int stAge = studentWithOrdersObj.getAge();
//        logger.info("The Student Name is {},Age is {}", stName,stAge);
//      List<Orders> listOfOrders = studentWithOrdersObj.getListOfOrders();
//      for(Orders eachOrder:listOfOrders){
//          int OrderId = eachOrder.getOrderId();
//         String ItemName = eachOrder.getItemName();
//         logger.info("The order number {}, with the item name {} belongs to the student {}",OrderId,ItemName,stName);
//      }
//    }
}
