package com.gralek.shatee.web;

import com.gralek.shatee.domain.Recipe;
import com.gralek.shatee.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;


    @GetMapping
    public ResponseEntity<List<Recipe>> getRecipes() {
        return new ResponseEntity<>((ArrayList<Recipe>)recipeRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        return optionalRecipe.isPresent() ?
                new ResponseEntity<>(optionalRecipe.get(), HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteRecipeById(@PathVariable Long id) {
        recipeRepository.deleteById(id);
        return new ResponseEntity(id, HttpStatus.OK);
    }
}
