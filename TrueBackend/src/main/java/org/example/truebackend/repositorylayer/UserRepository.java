package org.example.truebackend.repositorylayer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.example.truebackend.Models.User;

import java.util.List;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findByEmail(String email);
    List<User> findByPassword(String password);

}