package com.gralek.shatee.database;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
public class Step {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private int sequenceNumber;

    @NotNull
    private String description;

    @ManyToOne
    private Recipe recipe;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Step step = (Step) o;
        return Objects.equals(id, step.id) &&
                Objects.equals(description, step.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, description);
    }

    private Step() {}

    public Step(int sequenceNumber, String description) {
        this.sequenceNumber = sequenceNumber;
        this.description = description;
    }

}
