package com.gralek.shatee.repository;

import com.gralek.shatee.database.Recipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ROLE_USER')")
public interface RecipeRepository extends CrudRepository<Recipe, Long> {

    @Override
    @PreAuthorize("#recipe?.author == null or #recipe?.author?.email == authentication?.name")
    Recipe save(@Param("recipe") Recipe recipe);

    @Override
    @PreAuthorize("@recipeRepository.findById(#id)?.get()?.author?.email == authentication?.name")
    void deleteById(@Param("id") Long id);

    @Override
    @PreAuthorize("#recipe?.author?.email == authentication?.name")
    void delete(@Param("recipe") Recipe recipe);

}
