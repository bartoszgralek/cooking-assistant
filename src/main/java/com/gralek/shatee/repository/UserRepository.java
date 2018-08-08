package com.gralek.shatee.repository;

import com.gralek.shatee.database.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface UserRepository extends CrudRepository<User, Long> {

    User save(User user);
    User findById(String name);

    User findByEmail(String email);
}
