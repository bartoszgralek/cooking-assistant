package com.gralek.shatee.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;

@Getter
@Setter
@ToString
@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ToString.Exclude
    private Long id;

    @NotNull
    private String title;

    private String picture;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Step> steps = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private Set<ToolItem> tools = new HashSet<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Ingredient> ingredients = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "favouriteRecipes" ,cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
    @ToString.Exclude
    private Set<User> users = new HashSet<>();

    @ManyToOne
    private User author;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recipe recipe = (Recipe) o;
        return Objects.equals(id, recipe.id) &&
                Objects.equals(title, recipe.title) &&
                Objects.equals(steps, recipe.steps) &&
                Objects.equals(tools, recipe.tools);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, steps, tools);
    }

    private Recipe() {}

    public Recipe(String title) {
        this.title = title;
    }

    public Recipe(String title, String picture) {
        this.title = title;
        this.picture = picture;
    }

    @PreRemove
    private void detachRecipeFromUsers() {
        users.stream().forEach(user -> user.getFavouriteRecipes().remove(this));

    }

    public RecipeTO transform() {
        return new RecipeTO(
                this.id,
                this.title,
                this.author.getUsername(),
                this.picture
        );
    }

}
