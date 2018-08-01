package com.gralek.shatee.database;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Data
@Entity
public class Step {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private int sequenceNumber;

    @NotNull
    private String description;

    private Step() {}

    public Step(int sequenceNumber, String description) {
        this.sequenceNumber = sequenceNumber;
        this.description = description;
    }

}
