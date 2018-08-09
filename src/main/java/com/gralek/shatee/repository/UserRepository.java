package com.gralek.shatee.repository;

import com.gralek.shatee.database.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.prepost.PreAuthorize;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    Iterable<User> findAll();
}
