package org.example.truebackend.Models;

import jakarta.persistence.Entity;
import org.springframework.stereotype.Component;

@Component
public class itemInfo {
    private String productName;
    private String productDesc;
    private long productPrice;


    public itemInfo() {
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDesc() {
        return productDesc;
    }

    public void setProductDesc(String productDesc) {
        this.productDesc = productDesc;
    }

    public long getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(long productPrice) {
        this.productPrice = productPrice;
    }
}
