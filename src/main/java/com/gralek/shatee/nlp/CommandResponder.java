package com.gralek.shatee.nlp;

import com.gralek.shatee.domain.Step;
import com.gralek.shatee.domain.Unit;
import com.gralek.shatee.nlp.intent.Argument;
import com.gralek.shatee.nlp.intent.IntentTrainer;
import com.gralek.shatee.nlp.intent.IntentTrainerResponse;
import com.gralek.shatee.repository.RecipeRepository;
import com.gralek.shatee.utils.JSONUtils;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@NoArgsConstructor
public class CommandResponder {

    @Autowired
    private IntentTrainer intentTrainer;

    @Autowired
    private RecipeRepository recipeRepository;

    public String response(String message, ClientContext clientContext) {
        IntentTrainerResponse response = intentTrainer.categorizeSentence(message);
        try {
            switch (response.getAction()) {
                case "list":
                    String component = findInArgs(response.getArgs(), "component");
                    return listComponent(component, clientContext.getRecipeId());

                case "definition":
                    String ingredient = findInArgs(response.getArgs(), "ingredient");
                    return defineComponent(ingredient);

                case "next":
                    break;

                case "quantity":
                    break;

                default:
                    break;
            }
        } catch (NoTypeInArgumentListException e) {
            return "I do not under stand what you've said";
        }
        return null;
    }

    public static void main(String[] args) {
        CommandResponder commandResponder = new CommandResponder();
        //System.out.println(commandResponder.defineComponent("olive oil"));
        System.out.println(Arrays.asList(Unit.values()));

    }

    private String listComponent(String component, Long recipeId) {
        switch (component) {
            case "steps":
                return recipeRepository.findById(recipeId).get()
                        .getSteps().stream().map(Step::getDescription)
                        .collect(Collectors.joining(","));
            default:
                return "";
        }
    }

    /**
     * Method uses Wikipedia API for extracting substantial information about given component
     *
     * @param component
     * @return short description of component
     */

    private String defineComponent(String component) {
        component = component.replace(" ", "_"); //for consistent request URL

        String URL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=";
        JSONObject obj = new JSONObject(JSONUtils.jsonGetRequest(URL+component));

        /*
         * Extracting information from quite complicated json response
         */
        JSONObject pages = obj.getJSONObject("query").getJSONObject("pages");
        Iterator iteratorObj = pages.keys();
        JSONObject number = pages.getJSONObject((String) iteratorObj.next());
        String description = number.getString("extract");

        return description.substring(0, description.indexOf("\n")); // take only first paragraph
    }


    /**
     * Method for extracting element from list of Arguments
     *
     * @param args - list of arguments
     * @param element - desired element
     * @return given element's type corresponding value
     * @throws NoTypeInArgumentListException thrown when given element was not found in args
     */
    private String findInArgs(List<Argument> args, String element) throws NoTypeInArgumentListException {
        Optional<Argument> optional = args.stream().filter(el -> el.getType().equals(element)).findFirst();

        if(optional.isPresent()) {
            return optional.get().getName();
        }else {
            throw new NoTypeInArgumentListException();
        }
    }
}
