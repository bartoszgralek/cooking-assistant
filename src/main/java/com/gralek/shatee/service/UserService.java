package com.gralek.shatee.service;

import com.gralek.shatee.domain.User;
import com.gralek.shatee.domain.UserTO;

public interface UserService {

    User save(UserTO user);

    User update(UserTO user);

    User findByUsername(String username);

    User addRecipeToFavourites(User user, Long recipeId);
}
