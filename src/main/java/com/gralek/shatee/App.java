package com.gralek.shatee;

import me.xdrop.fuzzywuzzy.FuzzySearch;
import me.xdrop.fuzzywuzzy.model.ExtractedResult;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class App {

    public static void main(String[] args) throws IOException {
        List<String> ingredients = null;

        try (Stream<String> stream = Files.lines(Paths.get("./src/main/resources/nlp/definition2.txt"))) {

            ingredients = stream.distinct().collect(Collectors.toList());

        } catch (IOException e) {
            e.printStackTrace();
        }

        Scanner in = new Scanner(System.in);

        while(in.hasNextLine()) {
            FuzzySearch.extractTop(in.nextLine(), ingredients, 5).stream().sorted(ExtractedResult::compareTo)
                    .forEach(
                            extractedResult -> System.out.println(extractedResult.getString() + extractedResult.getScore())
                    );
        }

    }
}
