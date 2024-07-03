package org.example.truebackend.repositorylayer;

import org.example.truebackend.Models.UserInfoForStripe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RepositoryStripeDetails extends JpaRepository<UserInfoForStripe, Integer> {

    List<UserInfoForStripe> findUserInfoForStripeByEmail (String email);

    List<UserInfoForStripe> findAll();
}
