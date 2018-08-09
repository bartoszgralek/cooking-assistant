package com.gralek.shatee.database.initializer;

import com.gralek.shatee.database.*;
import com.gralek.shatee.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private ToolItemRepository toolItemRepository;

    @Autowired
    private ToolRepository toolRepository;


    @Override
    public void run(String... args){

        // User creation

        User u1 = new User("rick.astley@gmail.com", "admin123", "ROLE_USER");
        User u2 = new User("john.doe@gmail.com", "admin123", "ROLE_ADMIN");

        u1 = userRepository.save(u1);
        u2 = userRepository.save(u2);

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("rick.astley@gmail.com", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_USER")));

        Recipe r1 = new Recipe("Chicken curry");

        r1.setAuthor(u1);
        recipeRepository.save(r1);

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("john.doe@gmail.com", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_ADMIN")));


        Recipe r2 = new Recipe("Spaghetti bolognese");
        Recipe r3 = new Recipe("Dumplings");

        r2.setAuthor(u2);
        recipeRepository.save(r2);

        SecurityContextHolder.clearContext();

//        Tool tool1 = new Tool("Whisk");
//        Tool tool2 = new Tool("Grater");
//
//        toolRepository.save(tool1);
//        toolRepository.save(tool2);
//
//        ToolItem t1 = new ToolItem();
//        t1.setQuantity(2);
//        t1.setRecipe(r1);
//        t1.setTool(tool1);
//
//        ToolItem t2 = new ToolItem();
//        t2.setQuantity(1);
//        t2.setRecipe(r1);
//        t2.setTool(tool2);
//
//        Step s1 = new Step(1, "Boil pasta");
//        Step s2 = new Step(2, "Fry the meat in the pan");
//        Step s3 = new Step(3, "Add tomato sauce");
//
//        s1.setRecipe(r1);
//        s2.setRecipe(r1);
//        s3.setRecipe(r1);
//
//        r1.getSteps().add(s1);
//        r1.getSteps().add(s2);
//        r1.getSteps().add(s3);
//
//        r1.getTools().add(t1);
//        r1.getTools().add(t2);
//
//        r1 = recipeRepository.save(r1);
//
//        User u = userRepository.findById(1L).get();
//        u.getCreatedRecipes().add(r1);
//        r1.setAuthor(u);
//        u.getFavouriteRecipes().add(r1);
//        r1.getUsers().add(u);
//        userRepository.save(u);

    }
}
