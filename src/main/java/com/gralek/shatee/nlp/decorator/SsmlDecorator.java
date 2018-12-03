package com.gralek.shatee.nlp.decorator;

public class SsmlDecorator {

    static String pause = "<break time=\"1s\"/>\n";
    static String start = "<speak>\n";
    static String end = "</speak>\n";

    public static String toSsmlText(String message) {
        StringBuilder sb = new StringBuilder();

        sb.append(start);
        sb.append(message.replace("@pause@",pause));
        sb.append(end);

        return sb.toString();
    }
}
