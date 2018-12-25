package com.gralek.shatee.service;

import com.gralek.shatee.domain.Recipe;
import com.gralek.shatee.domain.RecipeCreateTO;
import com.gralek.shatee.domain.User;

public interface RecipeService {

    public Recipe assembleRecipe(RecipeCreateTO recipeCreateTO, User author);
}
