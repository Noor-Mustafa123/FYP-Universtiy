package org.example.truebackend.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenEntity {

    @Id
    @GeneratedValue
    public Integer id;
//    this annotation means that there should be no duplicate values in the database
    @Column(unique = true)
    public String refreshToken;

    @Column(unique = true)
    public String token;

    @Enumerated(EnumType.STRING)
    public TokenType tokenType = TokenType.BEARER;

    public String confirmationToken;

    public boolean revoked;

    public boolean expired;

    // make a one ot many relationship
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    public User user;


}

