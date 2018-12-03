package com.gralek.shatee.nlp.decorator;

import java.util.List;

public class StepsDecorator implements Decorator {

    @Override
    public String decorate(List<String> list) {
        StringBuilder sb = new StringBuilder();

        String start = "Here are your steps: \n @pause@";
        sb.append(start);

        for(int i=0;i<list.size();i++) {
            sb.append(String.format("Step %d: \n",i+1));
            sb.append("@pause@");
            sb.append(list.get(i));
            sb.append("\n@pause@");
        }

        return sb.toString();
    }
}
