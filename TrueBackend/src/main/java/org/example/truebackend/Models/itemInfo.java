package org.example.truebackend.Models;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Component
public class itemInfo {

    private String productName;
    private String productDesc;
    private long productPrice;
    private MultipartFile productImage;


    public itemInfo() {
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

    public void setProductPrice(long productPrice) {
        this.productPrice = productPrice;
    }
}
