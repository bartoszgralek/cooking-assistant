package com.gralek.shatee.web;

import com.gralek.shatee.domain.Recipe;
import com.gralek.shatee.domain.RecipeCreateTO;
import com.gralek.shatee.domain.RecipeTO;
import com.gralek.shatee.domain.User;
import com.gralek.shatee.repository.RecipeRepository;
import com.gralek.shatee.repository.UserRepository;
import com.gralek.shatee.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipes")
@PreAuthorize("hasRole('ROLE_USER')")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public ResponseEntity<List<RecipeTO>> getRecipes() {
        List<RecipeTO> list = recipeRepository.findAll().stream().map(Recipe::transform).collect(Collectors.toList());
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> optionalRecipe = recipeRepository.findById(id);
        return optionalRecipe
                .map(recipe -> new ResponseEntity<>(recipe, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Recipe> createRecipe(@RequestBody RecipeCreateTO recipeCreateTO, Principal principal) {

        User user = userRepository.findByUsername(principal.getName());
        Recipe recipe = recipeService.assembleRecipe(recipeCreateTO, user);

        return new ResponseEntity<>(recipe, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteRecipeById(@PathVariable Long id) {
        recipeRepository.deleteById(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
