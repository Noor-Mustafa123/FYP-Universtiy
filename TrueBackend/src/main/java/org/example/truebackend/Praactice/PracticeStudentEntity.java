package org.example.truebackend.Praactice;

import jakarta.persistence.*;
import org.example.truebackend.Praactice.PracticeLaptopEntity;

import java.util.List;

@Entity
public class PracticeStudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int studentId;
    private String name;
    private int age;
//    The cascade property tells Hibernate to save the PracticeLaptopEntity whenever a PracticeStudentEntity is saved.
    // it makes so that the student entity is managed inside of the laptop entity but only the foriegn key is present inside of the laptop eneity because of the
    //of mappedBy property
    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
    private PracticeLaptopEntity Laptop;

    //Creating one to many relationship
    // becaue we are annotating it we dont need to give the list a value using the new keyword spring itself will manage it
    @OneToMany(mappedBy = "studentObj" ,cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Orders> listOfOrders;

    public List<Orders> getListOfOrders() {
        return listOfOrders;
    }

    public void setListOfOrders(List<Orders> listOfOrders) {
        this.listOfOrders = listOfOrders;
    }

    public PracticeStudentEntity(String name, int age, PracticeLaptopEntity laptop) {

        this.name = name;
        this.age = age;
        Laptop = laptop;
    }

    public PracticeStudentEntity() {
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public PracticeLaptopEntity getLaptop() {
        return Laptop;
    }

    public void setLaptop(PracticeLaptopEntity laptop) {
        Laptop = laptop;
    }
}


