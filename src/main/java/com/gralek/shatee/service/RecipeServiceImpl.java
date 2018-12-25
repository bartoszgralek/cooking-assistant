package com.gralek.shatee.service;

import com.gralek.shatee.domain.Recipe;
import com.gralek.shatee.domain.RecipeCreateTO;
import com.gralek.shatee.domain.Step;
import com.gralek.shatee.domain.User;
import com.gralek.shatee.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public Recipe assembleRecipe(RecipeCreateTO recipeCreateTO, User author) {
        Recipe recipe = new Recipe(recipeCreateTO.getTitle(), recipeCreateTO.getPicture());

        recipe.setIngredients(recipeCreateTO.getIngredients());
        recipe.setTools(recipeCreateTO.getTools());

        AtomicInteger index = new AtomicInteger(1);
        recipe.setSteps(recipeCreateTO.getSteps()
                .stream().map(
                        step -> new Step(index.getAndIncrement(), step)
                )
                .collect(Collectors.toList()));
        recipe.setAuthor(author);

        return recipeRepository.save(recipe);
    }
}
