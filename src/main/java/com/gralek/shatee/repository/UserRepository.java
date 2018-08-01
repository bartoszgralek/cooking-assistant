package com.gralek.shatee.repository;

import com.gralek.shatee.database.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
