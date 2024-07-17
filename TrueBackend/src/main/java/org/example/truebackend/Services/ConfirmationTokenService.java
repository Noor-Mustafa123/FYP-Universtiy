package org.example.truebackend.Services;


import org.example.truebackend.Models.TokenEntity;
import org.example.truebackend.repositorylayer.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConfirmationTokenService {

    @Autowired
    public JavaMailSender javaMailSender;
    @Autowired
    public TokenRepository tokenRepository;


    public void sendEmail(SimpleMailMessage simpleMailMessageObj){
        javaMailSender.send(simpleMailMessageObj);
    }

    public TokenEntity getTokenEntityByConfirmationToken(String confirmationToken)throws Error{
       List<TokenEntity> tokenList =  tokenRepository.findTokenEntitiesByConfirmationToken(confirmationToken);
       if(tokenList.get(0) != null){
      return  tokenList.get(0);
       }
       else {
           throw new Error("Account creation failed");
       }
    }




}
