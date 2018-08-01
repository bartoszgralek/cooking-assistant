package com.gralek.shatee.database;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String title;

    @OneToMany
    private List<Step> steps = new ArrayList<>();

    @ManyToMany
    private Set<Tool> tools = new HashSet<>();

    private Recipe() {}

    public Recipe(String title) {
        this.title = title;
    }

}
