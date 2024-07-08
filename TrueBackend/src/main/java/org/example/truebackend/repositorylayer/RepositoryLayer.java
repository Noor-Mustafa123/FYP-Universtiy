package org.example.truebackend.repositorylayer;

import org.example.truebackend.Models.User;
import org.example.truebackend.Models.User1;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RepositoryLayer extends CrudRepository<User,Integer> {
//  this is a custom query method written by These methods are used to perform operations on your database. it will be automatically implemented by spring data jpa
    List<User> findByFirstName(String name);
    List<User> findByEmail(String email);
    List<User> findByPassword(String password);
    //The findByFirstName(String Name) method in your RepositoryLayer interface is designed to return a List<User1> because it's expected to return all the User1 objects from the database where the firstName matches the provided Name parameter.
}


//By extending CrudRepository, your RepositoryLayer interface gets all these methods, and you can use them to interact with your database without having to provide an implementation for them. This is because Spring Data JPA will automatically provide an implementation at runtime.  In addition to these methods, you can also define custom query methods in your RepositoryLayer interface,
// like findByName(String Name). Spring Data JPA will also provide an implementation for these methods by parsing the method name and creating a query that performs the operation indicated by the method name.