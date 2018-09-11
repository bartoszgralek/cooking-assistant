package com.gralek.shatee.repository;

import com.gralek.shatee.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {


}
