package org.example.truebackend.Models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
@Table(name="User_Details_Stripe")
public class UserInfoForStripe {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
    public int orderId ;

    public String email ;
    public String password ;
    public String address ;
    public int itemId ;
    public int itemQuantity;
    public String priceId;

    public String getPriceId() {
        return priceId;
    }

    public void setPriceId(String priceId) {
        this.priceId = priceId;
    }

    public UserInfoForStripe(String email, String password, String address, int itemId, int itemQuantity) {
        this.email = email;
        this.password = password;
        this.address = address;
        this.itemId = itemId;
        this.itemQuantity = itemQuantity;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(int itemQuantity) {
        this.itemQuantity = itemQuantity;
    }

    public UserInfoForStripe() {

    }
}
