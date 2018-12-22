package com.gralek.shatee.nlp.decorator;

import java.util.List;

public interface Decorator {

    String pause = "<break time=\"1s\"/>\n";
    String start = "<speak>\n";
    String end = "</speak>\n";

    String decorate(List<String> list);

    static String toSsmlText(String message) {
        StringBuilder sb = new StringBuilder();

        sb.append(start);
        sb.append(message.replace("@pause@",pause));
        sb.append(end);

        return sb.toString();
    }
}
