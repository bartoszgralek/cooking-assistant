package com.gralek.shatee.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RecipeTO {

    private Long id;
    private String title;
    private String author;
    private String picture;
}
