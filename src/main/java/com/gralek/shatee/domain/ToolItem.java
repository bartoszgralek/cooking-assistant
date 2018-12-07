package com.gralek.shatee.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class ToolItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    private Recipe recipe;

    @OneToOne
    private Tool tool;

    private int quantity;

    public ToolItem() {}

    @Override
    public String toString() {
        return quantity + " " + tool;
    }
}
