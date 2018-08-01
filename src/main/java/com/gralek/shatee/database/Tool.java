package com.gralek.shatee.database;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Tool {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    private Tool() {}

    public Tool(String name) {
        this.name = name;
    }

}
