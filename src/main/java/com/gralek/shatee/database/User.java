package com.gralek.shatee.database;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String email;

    @NotNull
    @Size(min = 8)
    private String password;

    @ManyToMany
    private Set<Recipe> favouriteRecipes = new HashSet<>();

    @ManyToMany
    private Set<Recipe> createdRecipes = new HashSet<>();

    private User() {}

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
