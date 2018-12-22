package com.gralek.shatee.nlp.intent;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@ToString
public class Argument {
    private String type;
    private String name;
}