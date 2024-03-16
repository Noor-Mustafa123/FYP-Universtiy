package org.example.truebackend.Models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RepositoryLayer extends CrudRepository<User1,Integer> {
//  this is a custom querymethod written by These methods are used to perform operations on your database. it will be automatically implemented by spring data jpa
    List<User1> findByfirstName(String Name);

}


//By extending CrudRepository, your RepositoryLayer interface gets all these methods, and you can use them to interact with your database without having to provide an implementation for them. This is because Spring Data JPA will automatically provide an implementation at runtime.  In addition to these methods, you can also define custom query methods in your RepositoryLayer interface,
// like findByName(String Name). Spring Data JPA will also provide an implementation for these methods by parsing the method name and creating a query that performs the operation indicated by the method name.