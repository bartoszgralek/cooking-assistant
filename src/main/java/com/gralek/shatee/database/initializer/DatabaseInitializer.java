package com.gralek.shatee.database.initializer;

import com.gralek.shatee.database.Recipe;
import com.gralek.shatee.database.Step;
import com.gralek.shatee.database.User;
import com.gralek.shatee.repository.RecipeRepository;
import com.gralek.shatee.repository.StepRepository;
import com.gralek.shatee.repository.ToolRepository;
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

    @Autowired
    private StepRepository stepRepository;

    @Autowired
    private ToolRepository toolRepository;


    @Override
    public void run(String... args){

        // User creation

        User u1 = new User("rick.astley@gmail.com", "admin123");
        User u2 = new User("john.doe@gmail.com", "admin123");

        userRepository.save(u1);
        userRepository.save(u2);

        Recipe r1 = new Recipe("Chicken curry");
        Recipe r2 = new Recipe("Spaghetti bolognese");
        Recipe r3 = new Recipe("Dumplings");

        Step s1 = new Step(1, "Boil pasta");
        Step s2 = new Step(2, "Fry the meat in the pan");
        Step s3 = new Step(3, "Add tomato sauce");

        s1.setRecipe(r1);
        s2.setRecipe(r1);
        s3.setRecipe(r1);

        r1.getSteps().add(s1);
        r1.getSteps().add(s2);
        r1.getSteps().add(s3);

        User u = userRepository.findById(1L).get();
        u.getFavouriteRecipes().add(r1);
        r1.getUsers().add(u);
        userRepository.save(u);

    }
}
