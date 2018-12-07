package com.gralek.shatee.nlp;

import com.gralek.shatee.domain.Recipe;
import lombok.Data;

@Data
public class ClientContext {

    private Recipe recipe;
    private int currentStep = 0; //table indexing

}
