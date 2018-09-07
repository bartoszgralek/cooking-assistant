package com.gralek.shatee.web;

import com.gralek.shatee.domain.User;
import com.gralek.shatee.domain.UserTO;
import com.gralek.shatee.repository.UserRepository;
import com.gralek.shatee.security.SecurityService;
import com.gralek.shatee.service.UserService;
import com.gralek.shatee.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class AccessController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ResponseEntity<User> registration(@Valid @RequestBody UserTO user, BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // for extention
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser.setRole("ROLE_USER");

        User savedUser = userRepository.save(newUser);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }



    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ResponseEntity<User> login(Authentication auth) {
        User loggedUser = userRepository.findByUsername(auth.getName());
        return new ResponseEntity<>(loggedUser, HttpStatus.OK);
    }

}
