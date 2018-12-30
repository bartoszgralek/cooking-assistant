package com.gralek.shatee;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class App {

    public static void main(String[] args) throws IOException {

        String data = null;
        
        try (Stream<String> stream = Files.lines(Paths.get("./src/main/resources/nlp/definition2.txt"))) {

            data = stream.distinct().map(e -> "\"" + e + "\"").collect(Collectors.joining(",\n"));

        } catch (IOException e) {
            e.printStackTrace();
        }

//        Scanner in = new Scanner(System.in);
//
//        while(in.hasNextLine()) {
//            FuzzySearch.extractTop(in.nextLine(), ingredients, 5).stream().sorted(ExtractedResult::compareTo)
//                    .forEach(
//                            extractedResult -> System.out.println(extractedResult.getString() + extractedResult.getScore())
//                    );
//        }

        Files.write(Paths.get("./src/main/resources/ingredients.txt"), data.getBytes());

    }
}
