package org.example.truebackend.Models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Table(name="User_Details_Stripe")
public class UserInfoForStripe {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
    private int orderId ;

    private String email ;
    private String address ;
//    The @OneToMany annotation in Spring Data JPA is used to establish a one-to-many relationship between two entities. In your case, it seems like you want to establish a relationship where one user can have many products in their cart.
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
   private List<EachProductInADC> items ;

    public List<EachProductInADC> getItems() {
        return items;
    }

    public void setItems(List<EachProductInADC> items) {
        this.items = items;
    }

    public UserInfoForStripe() {

    }


    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }




}
