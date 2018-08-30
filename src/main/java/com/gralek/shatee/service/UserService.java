package com.gralek.shatee.service;

import com.gralek.shatee.domain.User;
import com.gralek.shatee.web.UserForm;

public interface UserService {
    User save(UserForm user);

    User findByUsername(String username);
}
