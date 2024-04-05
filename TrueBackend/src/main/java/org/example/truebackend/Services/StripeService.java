package org.example.truebackend.Services;

import org.example.truebackend.Models.UserInfoForStripe;
import org.example.truebackend.repositorylayer.RepositoryStripeDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    @Autowired
    public RepositoryStripeDetails stripeRepoObj;



    public void saveUserInfoOnOrder (UserInfoForStripe infoObj) {
        stripeRepoObj.save(infoObj);
    }


}