package com.gralek.shatee.service;

import com.gralek.shatee.domain.Recipe;
import com.gralek.shatee.domain.User;
import com.gralek.shatee.domain.UserTO;
import com.gralek.shatee.repository.RecipeRepository;
import com.gralek.shatee.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class
UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Override
    public User save(UserTO user) {
        User newUser = new User();
        newUser.setId(user.getId());
        newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser.setRole(user.getRole());
        return userRepository.save(newUser);
    }

    @Override
    public User update(UserTO user) {
        User updatedUser = userRepository.findById(user.getId()).get();
        updatedUser.setUsername(user.getUsername());
        if(!user.getPassword().isEmpty())
            updatedUser.setPassword(user.getPassword());
        updatedUser.setRole(user.getRole());
        return userRepository.save(updatedUser);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User addRecipeToFavourites(User user, Long recipeId) {
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);
        User finalUser = user;

        recipe.ifPresent(r -> {
            finalUser.getFavouriteRecipes().add(r);
            r.getUsers().add(finalUser);
        });
        user = userRepository.save(user);
        return user;
    }
}