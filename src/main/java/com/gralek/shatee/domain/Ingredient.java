package com.gralek.shatee.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private float quantity;
    private Unit unit;

    @JsonIgnore
    @ManyToOne
    private Recipe recipe;

    public Ingredient(String name, float quantity, Unit unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    private Ingredient() {} //for database purposes

    @Override
    public String toString() {
        return String.format("%s %s %s", name, quantity, unit);
    }
}
