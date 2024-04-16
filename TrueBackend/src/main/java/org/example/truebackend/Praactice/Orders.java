package org.example.truebackend.Praactice;

import jakarta.persistence.*;

@Entity
public class Orders {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private int OrderId;
   private String itemName;
   private int itemQuantity;
   @ManyToOne
   private PracticeStudentEntity studentObj;


   public PracticeStudentEntity getStudentObj() {
      return studentObj;
   }

   public void setStudentObj(PracticeStudentEntity studentObj) {
      this.studentObj = studentObj;
   }

   public Orders() {
   }

   public Orders(String itemName, int itemQuantity) {
      this.itemName = itemName;
      this.itemQuantity = itemQuantity;
   }

   public int getOrderId() {
      return OrderId;
   }

   public void setOrderId(int orderId) {
      OrderId = orderId;
   }

   public String getItemName() {
      return itemName;
   }

   public void setItemName(String itemName) {
      this.itemName = itemName;
   }

   public int getItemQuantity() {
      return itemQuantity;
   }

   public void setItemQuantity(int itemQuantity) {
      this.itemQuantity = itemQuantity;
   }
}
