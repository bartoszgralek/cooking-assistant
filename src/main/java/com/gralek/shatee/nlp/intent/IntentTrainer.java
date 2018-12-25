package com.gralek.shatee.nlp.intent;

import opennlp.tools.doccat.DoccatFactory;
import opennlp.tools.doccat.DoccatModel;
import opennlp.tools.doccat.DocumentCategorizerME;
import opennlp.tools.doccat.DocumentSample;
import opennlp.tools.namefind.*;
import opennlp.tools.tokenize.Tokenizer;
import opennlp.tools.tokenize.TokenizerME;
import opennlp.tools.tokenize.TokenizerModel;
import opennlp.tools.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Component
@Scope("singleton")
public class IntentTrainer {

    private static Tokenizer tokenizer;
    private static DocumentCategorizerME categorizer;
    private static NameFinderME[] nameFinderMEs;

    @Autowired
    public IntentTrainer(IntentProperties intentProperties) throws IOException {

        File trainingDirectory = new File("./src/main/resources/nlp/train");
        String[] slots = {"ingredient", "component"};


        List<ObjectStream<DocumentSample>> categoryStreams = new ArrayList<>();
        for (File trainingFile : trainingDirectory.listFiles()) {
            String intent = trainingFile.getName().replaceFirst("[.][^.]+$", "");
            ObjectStream<String> lineStream = new PlainTextByLineStream(new MarkableFileInputStreamFactory(trainingFile), "UTF-8");
            ObjectStream<DocumentSample> documentSampleStream = new IntentDocumentSampleStream(intent, lineStream);
            categoryStreams.add(documentSampleStream);
        }

        ObjectStream<DocumentSample> combinedDocumentSampleStream = ObjectStreamUtils.concatenateObjectStream(categoryStreams);

        TrainingParameters trainingParams = new TrainingParameters();
        trainingParams.put(TrainingParameters.ITERATIONS_PARAM, 8);
        trainingParams.put(TrainingParameters.CUTOFF_PARAM, 1);

        DoccatModel doccatModel = DocumentCategorizerME.train("en", combinedDocumentSampleStream, trainingParams, new DoccatFactory());
        combinedDocumentSampleStream.close();

        List<TokenNameFinderModel> tokenNameFinderModels = new ArrayList<>();

        int counter = 1;
        for (String slot : slots) {
            List<ObjectStream<NameSample>> nameStreams = new ArrayList<>();
            for (File trainingFile : trainingDirectory.listFiles()) {
                ObjectStream<String> lineStream = new PlainTextByLineStream(new MarkableFileInputStreamFactory(trainingFile), "UTF-8");
                ObjectStream<NameSample> nameSampleStream = new NameSampleDataStream(lineStream);
                nameStreams.add(nameSampleStream);
            }
            ObjectStream<NameSample> combinedNameSampleStream = ObjectStreamUtils.concatenateObjectStream(nameStreams);

            TokenNameFinderModel tokenNameFinderModel = null;

            if(intentProperties.isTrain()) {
                tokenNameFinderModel = NameFinderME.train("en", slot, combinedNameSampleStream, trainingParams, new TokenNameFinderFactory());
                File file = new File("./src/main/resources/nlp/en-recipe-" + counter++ + ".bin");
                FileOutputStream fileOutputStream = new FileOutputStream(file);
                tokenNameFinderModel.serialize(fileOutputStream);
            }else {
                FileInputStream file = new FileInputStream("./src/main/resources/nlp/en-recipe-" + counter++ + ".bin");
                tokenNameFinderModel = new TokenNameFinderModel(file);
            }
            combinedNameSampleStream.close();
            tokenNameFinderModels.add(tokenNameFinderModel);
        }

        categorizer = new DocumentCategorizerME(doccatModel);
        nameFinderMEs = new NameFinderME[tokenNameFinderModels.size()];
        for (int i = 0; i < tokenNameFinderModels.size(); i++) {
            nameFinderMEs[i] = new NameFinderME(tokenNameFinderModels.get(i));
        }

        System.out.println("Training complete. Ready.");

        InputStream modelIn = new FileInputStream("./src/main/resources/nlp/en-token.bin");
        TokenizerModel model = new TokenizerModel(modelIn);
        tokenizer = new TokenizerME(model);
    }

    public IntentTrainerResponse categorizeSentence(String message) {
        List<Argument> args = new ArrayList<>();
        String action = null;

        for(int j=0;j<10 || args.isEmpty();j++) { //sometimes args list is empty idk why
            args = new ArrayList<>();

            double[] outcome = categorizer.categorize(tokenizer.tokenize(message));
            action = categorizer.getBestCategory(outcome);

            String[] tokens = tokenizer.tokenize(message);
            for (NameFinderME nameFinderME : nameFinderMEs) {
                Span[] spans = nameFinderME.find(tokens);
                String[] names = Span.spansToStrings(spans, tokens);
                for (int i = 0; i < spans.length; i++) {
                    args.add(new Argument(spans[i].getType(), names[i]));
                }
            }
        }

        return new IntentTrainerResponse(action, args);
    }

    public static void main(String[] args) throws IOException {
        IntentTrainer intentTrainer = new IntentTrainer(new IntentProperties());
        IntentTrainerResponse response = intentTrainer.categorizeSentence("Could you please tell me what salt is?");
        System.out.println(response);
        Scanner in = new Scanner(System.in);
        while(in.hasNextLine()) {
            System.out.println(intentTrainer.categorizeSentence(in.nextLine()));
        }

    }

}
