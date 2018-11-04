package com.gralek.shatee.nlp;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class IntentTrainerResponse {

    private String action;
    private List<Argument> args;

    public IntentTrainerResponse(String action, List<Argument> args) {
        this.action = action;
        this.args = args;
    }

}
