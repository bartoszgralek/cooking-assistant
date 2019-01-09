package com.gralek.shatee.initializer;

import com.gralek.shatee.domain.*;
import com.gralek.shatee.repository.RecipeRepository;
import com.gralek.shatee.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;


    @Override
    public void run(String... args){

        // User creation

        User u1 = new User("admin", "admin", "ROLE_ADMIN");
        User u2 = new User("user", "user", "ROLE_USER");

        userRepository.save(u1);
        userRepository.save(u2);

        Recipe r1 = new Recipe("Chicken curry","curry.jpg_3901085492817033069");
        Recipe r2 = new Recipe("Spaghetti bolognese","bolognese.jpg_8931257340728891798");
        Recipe r3 = new Recipe("Dumplings", "dumplings.jpg_1975114512590872766");
        Recipe r4 = new Recipe("Shakshuka", "shakshuka.jpg_9039782523778522453");
        Recipe r5 = new Recipe("Banana curry", "banana_curry.jpg");

        Ingredient olive_oil = new Ingredient("olive oil", 1, Unit.tbsp);
        r5.getIngredients().add(olive_oil);
        Ingredient red_onion = new Ingredient("red onion", 1, Unit.pc);
        r5.getIngredients().add(red_onion);
        Ingredient apple = new Ingredient("apple", 1, Unit.pc);
        r5.getIngredients().add(apple);
        Ingredient curry_powder = new Ingredient("curry powder", 2, Unit.tbsp);
        r5.getIngredients().add(curry_powder);
        Ingredient sultanas = new Ingredient("sultanas", 2, Unit.tbsp);
        r5.getIngredients().add(sultanas);
        Ingredient cashew_nuts = new Ingredient("cashew nuts", 2, Unit.tbsp);
        r5.getIngredients().add(cashew_nuts);
        Ingredient bananas = new Ingredient("bananas", 3, Unit.pc);
        r5.getIngredients().add(bananas);
        Ingredient coriander = new Ingredient("coriander", 2, Unit.tbsp);
        r5.getIngredients().add(coriander);
        Ingredient rice = new Ingredient("rice", 100, Unit.g);
        r5.getIngredients().add(rice);

        r5.getTools().add(Tool.KNIFE);
        r5.getTools().add(Tool.BOWL);
        r5.getTools().add(Tool.POT);

        Step e = new Step(1, "Heat the oil in a pan and sauté the onion for 2-3 minutes");
        r5.getSteps().add(e);
        Step e1 = new Step(2, "Add the apple and curry powder and cook for 1-2 minutes, stirring, before adding the sultanas and cashew nuts");
        r5.getSteps().add(e1);
        Step e2 = new Step(3, "Continue to cook for 5-6 minutes, to soften the apple");
        r5.getSteps().add(e2);
        Step e3 = new Step(4, "Add the banana and cook for a further 3-4 minutes, stirring occasionally");
        r5.getSteps().add(e3);
        Step e4 = new Step(5, "Stir in the chopped coriander, season to taste and serve with rice");
        r5.getSteps().add(e4);

        olive_oil.setRecipe(r5);
        red_onion.setRecipe(r5);
        apple.setRecipe(r5);
        curry_powder.setRecipe(r5);
        sultanas.setRecipe(r5);
        cashew_nuts.setRecipe(r5);
        bananas.setRecipe(r5);
        coriander.setRecipe(r5);
        rice.setRecipe(r5);

        e.setRecipe(r5);
        e1.setRecipe(r5);
        e2.setRecipe(r5);
        e3.setRecipe(r5);
        e4.setRecipe(r5);

        Ingredient i1 = new Ingredient("meat", 500, Unit.g);
        Ingredient i2 = new Ingredient("tomato sauce", 500, Unit.ml);
        Ingredient i3 = new Ingredient("olive oil", 20, Unit.ml);
        Ingredient i4 = new Ingredient("Vanilla stick", 2, Unit.pc);


        Step s1 = new Step(1, "Boil pasta");
        Step s2 = new Step(2, "Fry the meat in the pan");
        Step s3 = new Step(3, "Add tomato sauce");

        s1.setRecipe(r1);
        s2.setRecipe(r1);
        s3.setRecipe(r1);

        r1.getSteps().add(s1);
        r1.getSteps().add(s2);
        r1.getSteps().add(s3);

        r1.getTools().add(Tool.KNIFE);
        r1.getTools().add(Tool.GRATER);

        i1.setRecipe(r1);
        i2.setRecipe(r1);
        i3.setRecipe(r1);
        i4.setRecipe(r1);

        r1.setIngredients(Arrays.asList(i1, i2, i3, i4));

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken("admin", "doesn't matter",
                        AuthorityUtils.createAuthorityList("ROLE_ADMIN")));

        r1.setAuthor(u1); // RecipeEventHandler captures only REST API events
        r1 = recipeRepository.save(r1);

        r2.setAuthor(u1);
        r2 = recipeRepository.save(r2);

        r3.setAuthor(u1);
        r3 = recipeRepository.save(r3);

        r4.setAuthor(u1);
        r4 = recipeRepository.save(r4);

        r5.setAuthor(u1);
        r5 = recipeRepository.save(r5);



        User u = userRepository.findById(1L).get();
        u.getFavouriteRecipes().add(r1);
        //r1.getUsers().add(u);
        userRepository.save(u);

        User u_2 = userRepository.findById(2L).get();
        u_2.getFavouriteRecipes().add(r1);
        u_2.getFavouriteRecipes().add(r2);
        u_2.getFavouriteRecipes().add(r3);
        userRepository.save(u_2);

        SecurityContextHolder.clearContext();
    }
}
