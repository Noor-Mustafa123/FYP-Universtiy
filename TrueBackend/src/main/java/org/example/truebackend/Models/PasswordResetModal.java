package org.example.truebackend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class PasswordResetModal {
   @Id
    private int Id;
   private String email;
   private String password;

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
