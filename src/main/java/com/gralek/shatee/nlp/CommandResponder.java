package com.gralek.shatee.nlp;

import com.gralek.shatee.domain.*;
import com.gralek.shatee.nlp.decorator.Decorator;
import com.gralek.shatee.nlp.decorator.IngredientsDecorator;
import com.gralek.shatee.nlp.decorator.StepsDecorator;
import com.gralek.shatee.nlp.decorator.ToolsDecorator;
import com.gralek.shatee.nlp.intent.Argument;
import com.gralek.shatee.nlp.intent.IntentTrainer;
import com.gralek.shatee.nlp.intent.IntentTrainerResponse;
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

    public String response(String message, ClientContext clientContext) {
        IntentTrainerResponse response = intentTrainer.categorizeSentence(message);
        System.out.println(response);
        try {
            switch (response.getAction()) {
                case "list":
                    String component = findInArgs(response.getArgs(), "component");
                    return listComponent(component, clientContext.getRecipe());
                case "definition":
                    String ingredient = findInArgs(response.getArgs(), "ingredient");
                    return defineComponent(ingredient);
                case "next":
                    return nextStep(clientContext);
                case "current":
                    return currentStep(clientContext);
                case "previous":
                    return previousStep(clientContext);
                case "quantity":
                    String ingredient_2 = findInArgs(response.getArgs(), "ingredient");
                    return quantityForProduct(ingredient_2, clientContext);
                default:
                    break;
            }
        } catch (NoTypeInArgumentListException e) { // command is not recognized
            return "I do not understand what you've said";
        } catch (NoSuchElementException e) {
            return "Given ingredient is not in a ingredient list";
        }
        return "";
    }

    private String currentStep(ClientContext clientContext) {
        int currentStep = clientContext.getCurrentStep();

        try {
            Step step = clientContext.getRecipe().getSteps().get(currentStep);

            return "Current step is: @pause@ " + step.getDescription();
        }catch(IndexOutOfBoundsException e) {
            clientContext.setCurrentStep(0);
            return "You are out of steps. Counter will now reset for you.";
        }
    }

    private String nextStep(ClientContext clientContext) {
        int nextStep = clientContext.getCurrentStep() + 1;

        try {
            Step step = clientContext.getRecipe().getSteps().get(nextStep);
            clientContext.setCurrentStep(nextStep);

            return "The next step is: @pause@" + step.getDescription();
        }catch(IndexOutOfBoundsException e) {
            clientContext.setCurrentStep(0);
            return "You are out of steps. Counter will now reset for you.";
        }
    }

    private String previousStep(ClientContext clientContext) {
        int previousStep = clientContext.getCurrentStep() - 1;

        if(previousStep < 0)
            return "This is your first step";

        try {
            Step step = clientContext.getRecipe().getSteps().get(previousStep);
            clientContext.setCurrentStep(previousStep);

            return "The previous step is: @pause@" + step.getDescription();
        }catch(IndexOutOfBoundsException e) {
            clientContext.setCurrentStep(0);
            return "You are out of steps. Counter will now reset for you.";
        }
    }




    public static void main(String[] args) {
        CommandResponder commandResponder = new CommandResponder();
        //System.out.println(commandResponder.defineComponent("olive oil"));
        System.out.println(Arrays.asList(Unit.values()));

    }

    private String quantityForProduct(String ingredient, ClientContext clientContext) throws NoSuchElementException {

        List<Ingredient> ingredients = clientContext.getRecipe().getIngredients();
        Optional<Ingredient> found = ingredients.stream().filter(i -> i.getName().equals(ingredient)).findFirst();
        Ingredient ing = found.get();
        return String.format("%s @pause@ %s %s", ing.getName(),ing.getQuantity(),ing.getUnit());

    }

    private String listComponent(String component, Recipe recipe) {

        Decorator decorator;

        switch (component) {
            case "steps":
                decorator = new StepsDecorator();
                List<String> steps =
                        recipe
                                .getSteps().stream().map(Step::getDescription)
                                .collect(Collectors.toList());
                return decorator.decorate(steps);
            case "tools":
                decorator = new ToolsDecorator();
                List<String> tools =
                        recipe.getTools().stream()
                                .map(Tool::name)
                                .collect(Collectors.toList());
                return decorator.decorate(tools);
            case "ingredients":
                decorator = new IngredientsDecorator();
                List<String> ingredients =
                        recipe
                                .getIngredients().stream().map(Ingredient::toString)
                                .collect(Collectors.toList());
                return decorator.decorate(ingredients);
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

        int paragraphIndex = description.indexOf(".", description.indexOf(".") + 1);

        return paragraphIndex != -1 ? description.substring(0, paragraphIndex+1) : description;
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

        if(optional.isPresent() && !optional.get().getName().isEmpty()) {
            return optional.get().getName();
        }else {
            throw new NoTypeInArgumentListException();
        }
    }
}
