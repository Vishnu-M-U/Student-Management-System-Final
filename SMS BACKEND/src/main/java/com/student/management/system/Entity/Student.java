package com.student.management.system.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@Table(name="Student")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

//Entity annotation is necessary for a class to be treated as a database table,while the
//@Table annotation is not.it is used when there are multiple tables.
public class Student {

    //we are giving id as the primary key
    @Id

    private int id;
    private String name;
    private float maths;
    private float physics;
    private float chemistry;
    private float biology;
    private float english;

    //getter and setter methods


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

    public float getMaths() {
        return maths;
    }

    public void setMaths(float maths) {
        this.maths = maths;
    }

    public float getPhysics() {
        return physics;
    }

    public void setPhysics(float physics) {
        this.physics = physics;
    }

    public float getChemistry() {
        return chemistry;
    }

    public void setChemistry(float chemistry) {
        this.chemistry = chemistry;
    }

    public float getBiology() {
        return biology;
    }

    public void setBiology(float biology) {
        this.biology = biology;
    }

    public float getEnglish() {
        return english;
    }

    public void setEnglish(float english) {
        this.english = english;
    }
}
