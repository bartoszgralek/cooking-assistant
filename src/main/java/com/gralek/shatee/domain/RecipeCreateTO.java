package com.gralek.shatee.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RecipeCreateTO {

    private String title;
    private String picture;
    private List<String> steps;
    private List<Tool> tools;
    private List<Ingredient> ingredients;
}
