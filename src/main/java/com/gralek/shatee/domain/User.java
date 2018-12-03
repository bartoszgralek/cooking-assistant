package com.gralek.shatee.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
@Entity
public class User {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Exclude
    private Long id;

    @NotNull
    @Column(unique = true)
    private String username;

    private String role;

    @JsonIgnore
    @NotNull
//    @Size(min = 8)
    @ToString.Exclude
    private String password;

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @ToString.Exclude
    private Set<Recipe> favouriteRecipes = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "author", cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @ToString.Exclude
    private Set<Recipe> createdRecipes = new HashSet<>();

    public User() {}

    public User(String username, String password, String role) {
        this.username = username;
        setPassword(password);
        this.role = role;
    }

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    @PreRemove
    public void detachAllBonds() {
        favouriteRecipes.stream().forEach(p->p.getUsers().remove(this));
        createdRecipes.stream().forEach(p->p.setAuthor(null));
    }
}

