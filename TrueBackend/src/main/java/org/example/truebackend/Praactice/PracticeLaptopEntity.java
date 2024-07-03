package org.example.truebackend.Praactice;

import jakarta.persistence.*;

@Entity
public class PracticeLaptopEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int laptopId;
    private String brand;
    private String typeOfLaptop;

    public String getTypeOfLaptop() {
        return typeOfLaptop;
    }

    public void setTypeOfLaptop(String typeOfLaptop) {
        this.typeOfLaptop = typeOfLaptop;
    }

    @OneToOne
    private PracticeStudentEntity student;

    public PracticeLaptopEntity() {
    }

    public PracticeLaptopEntity(String brand, PracticeStudentEntity student) {

        this.brand = brand;
        this.student = student;
    }


    public int getLaptopId() {
        return laptopId;
    }

    public void setLaptopId(int laptopId) {
        this.laptopId = laptopId;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public PracticeStudentEntity getStudent() {
        return student;
    }

    public void setStudent(PracticeStudentEntity student) {
        this.student = student;
    }
}
