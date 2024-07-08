package org.example.truebackend.Models;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class RegisterEntity  {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private Role role;
}
