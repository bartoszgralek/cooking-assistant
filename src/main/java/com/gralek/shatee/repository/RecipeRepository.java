package com.gralek.shatee.repository;

import com.gralek.shatee.database.Recipe;
import org.springframework.data.repository.CrudRepository;

public interface RecipeRepository extends CrudRepository<Recipe, Long> {
}
