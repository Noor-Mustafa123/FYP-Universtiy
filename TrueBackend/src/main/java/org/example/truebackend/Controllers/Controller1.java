package org.example.truebackend.Controllers;

import org.example.truebackend.Models.User1;
import org.springframework.web.bind.annotation.*;

//TODO: learn abou SprintBoot DataJPA and autowiring in springboot

@RestController
@RequestMapping("/UserData")
public class Controller1 {

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
        return "User1 resource updated successfully";
    }

    //    Update mapping
    @PutMapping("/UpUser1")
    public String updateMethod(@RequestBody User1 UserObj) {
        this.userObj = UserObj;
        return "User1 Data updated successfully";
    }

//    Delete Method
    @DeleteMapping("{UserId}")
    public String deleteMethod(@PathVariable String UserId){
    this.userObj = null;
    return " this User1 is deleted";
    }
}







