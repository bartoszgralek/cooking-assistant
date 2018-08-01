package com.gralek.shatee.database.initializer;

import com.gralek.shatee.database.Recipe;
import com.gralek.shatee.database.User;
import com.gralek.shatee.repository.RecipeRepository;
import com.gralek.shatee.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public void run(String... args){
        User u1 = new User("rick.astley@gmail.com", "admin123");
        User u2 = new User("john.doe@gmail.com", "admin123");

        Recipe r1 = new Recipe("Chicken curry");
        Recipe r2 = new Recipe("Spaghetti bolognese");
        Recipe r3 = new Recipe("Dumplings");

        recipeRepository.save(r1);
        recipeRepository.save(r2);
        recipeRepository.save(r3);

        u1.getFavouriteRecipes().add(r1);
        u1.getFavouriteRecipes().add(r2);
        u1.getCreatedRecipes().add(r3);

        u2.getFavouriteRecipes().add(r1);
        u2.getFavouriteRecipes().add(r2);
        u2.getFavouriteRecipes().add(r3);

        userRepository.save(u1);
        userRepository.save(u2);


    }
}
