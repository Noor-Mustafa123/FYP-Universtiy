package Old_Hibernate_practiceproject_classes;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity

public class Entity1 {
@Id
    protected int id;
    protected String name;
    protected int age;
    protected String Department;


    public Entity1(int id, String name, int age, String department) {
        this.id = id;
        this.name = name;
        this.age = age;
        Department = department;
    }



    public Entity1() {

    }

//    TODO: what does the try and catach block do?
//    TODO: Why are super keywords used here even this classs does not implement any interface

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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getDepartment() {
        return Department;
    }

    public void setDepartment(String department) {
        Department = department;
    }
}

