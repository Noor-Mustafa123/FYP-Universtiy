package org.example.truebackend.repositorylayer;

import org.example.truebackend.Models.UserInfoForStripe;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RepositoryStripeDetails extends CrudRepository<UserInfoForStripe, Integer> {
    List<UserInfoForStripe> findUserInfoForStripeByPriceId (String priceId);
    List<UserInfoForStripe> findUserInfoForStripeByEmail (String email);
}
