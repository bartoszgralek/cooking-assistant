package com.gralek.shatee.nlp.decorator;

import java.util.List;

public class IngredientsDecorator implements Decorator {

    @Override
    public String decorate(List<String> list) {
        StringBuilder sb = new StringBuilder();

        sb.append("Ingredients are: \n@pause@");

        list.forEach(ingredient -> sb.append(ingredient + "\n@pause@"));

        return sb.toString();
    }
}
