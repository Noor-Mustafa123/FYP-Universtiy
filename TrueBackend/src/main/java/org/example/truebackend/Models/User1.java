package org.example.truebackend.Models;

public class User1 {
    private int id;
    private String name;

    public User1(int id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public User1() {

    }

    private String email;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
