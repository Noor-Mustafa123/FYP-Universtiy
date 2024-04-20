package org.example.truebackend.Services;

import org.example.truebackend.Models.EachProductInADC;
import org.example.truebackend.Models.UserInfoForStripe;
import org.example.truebackend.repositorylayer.RepositoryStripeDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    @Autowired
    public RepositoryStripeDetails stripeRepoObj;



    public void saveUserInfoOnOrder (UserInfoForStripe infoObj) {
//forEach loop
        for(EachProductInADC item: infoObj.getItems()) {
            item.setUserObj(infoObj);
        }
        stripeRepoObj.save(infoObj);
        System.out.println("payment sucessfull user data sucessfully saved to the database");
    }


}
