package com.gralek.shatee.nlp.decorator;

import java.util.List;

public class ToolsDecorator implements Decorator {
    @Override
    public String decorate(List<String> list) {
        StringBuilder sb = new StringBuilder();

        sb.append("Here are your tools: \n @pause@");

        list.forEach(tool -> {
                    sb.append(tool + "\n@pause@");
                }
        );

        return sb.toString();
    }
}
