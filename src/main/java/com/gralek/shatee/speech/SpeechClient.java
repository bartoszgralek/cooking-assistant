package com.gralek.shatee.speech;

import com.google.api.gax.rpc.ApiStreamObserver;
import com.google.api.gax.rpc.BidiStreamingCallable;
import com.google.cloud.speech.v1.*;
import com.google.cloud.texttospeech.v1.*;
import com.google.gson.Gson;
import com.google.protobuf.ByteString;
import com.gralek.shatee.nlp.ClientContext;
import com.gralek.shatee.nlp.CommandResponder;
import com.gralek.shatee.nlp.decorator.SsmlDecorator;
import com.gralek.shatee.repository.RecipeRepository;
import com.gralek.shatee.utils.ApplicationContextUtils;
import lombok.Data;
import org.apache.commons.io.IOUtils;
import org.java_websocket.WebSocket;

import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.List;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.Logger;

@Data
public class SpeechClient implements ApiStreamObserver<StreamingRecognizeResponse> {

    private WebSocket client;
    private ClientContext clientContext;

    //beans
    private RecipeRepository recipeRepository;
    private CommandResponder commandResponder;

    private Gson gson = new Gson();
    private boolean running = true;
    private boolean listening = false;
    private static final Logger logger = Logger.getLogger(SpeechClient.class.getName());

    // Google SpeechDetect Api classes
    private TextToSpeechClient textToSpeechClient;
    private VoiceSelectionParams voice;
    private AudioConfig audioConfig;
    private com.google.cloud.speech.v1.SpeechClient speech;
    private ApiStreamObserver<StreamingRecognizeRequest> requestObserver;

    public SpeechClient(WebSocket client) {
        this.client = client;
        recipeRepository = (RecipeRepository) ApplicationContextUtils.getApplicationContext().getBean("recipeRepository");
        commandResponder = (CommandResponder) ApplicationContextUtils.getApplicationContext().getBean("commandResponder");
    }

    public void initialize(String initialMessage) {
        Constraints constraints = gson.fromJson(initialMessage, Constraints.class);

        System.out.println("got initial message");
        clientContext = new ClientContext();
        clientContext.setRecipe(recipeRepository.findById(constraints.recipeId).get());
        try {
            // text to speech configuration
            textToSpeechClient = TextToSpeechClient.create();

            // Build the voice request, select the language code ("en-US") and the ssml voice gender
            // ("neutral")
            voice = VoiceSelectionParams.newBuilder()
                    .setLanguageCode("en-GB")
                    .build();

            // Select the type of audio file you want returned
            audioConfig = AudioConfig.newBuilder()
                    .setAudioEncoding(AudioEncoding.LINEAR16)
                    .build();

            speech = com.google.cloud.speech.v1.SpeechClient.create();
            BidiStreamingCallable<StreamingRecognizeRequest, StreamingRecognizeResponse> callable =
                    speech.streamingRecognizeCallable();

            requestObserver = callable.bidiStreamingCall(this);
            // Build and send a StreamingRecognizeRequest containing the parameters for
            // processing the audio.
            RecognitionConfig config =
                    RecognitionConfig.newBuilder()
                            .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                            .setSampleRateHertz(constraints.sampleRate)
                            .setLanguageCode("en-US")
                            .build();
            StreamingRecognitionConfig streamingConfig =
                    StreamingRecognitionConfig.newBuilder()
                            .setConfig(config)
                            .build();

            StreamingRecognizeRequest initial =
                    StreamingRecognizeRequest.newBuilder().setStreamingConfig(streamingConfig).build();
            requestObserver.onNext(initial);


            client.send(initialMessage);

            listening = true;
        } catch (IOException e) {
            logger.log(Level.WARNING, "Error in SpeechClient initialize method", e);
        }
    }

    public void onMessage(String message) {
        String command = message.substring(0, message.indexOf(":"));
        String body = message.substring(message.indexOf(":")+1);
        switch(command) {
            case "START":
                initialize(body);
                break;
            case "END":
                close();
                break;
            default:
                break;
        }
    }

    public void onMessage(ByteBuffer bytes) {
        byte[] data = bytes.array();
        StreamingRecognizeRequest request =
                StreamingRecognizeRequest.newBuilder()
                        .setAudioContent(ByteString.copyFrom(data, 0, data.length))
                        .build();
        requestObserver.onNext(request);
    }

    public static void main(String[] args) {
    }

    @Override
    public void onNext(StreamingRecognizeResponse response) {
        List<StreamingRecognitionResult> results = response.getResultsList();
        if (results.size() < 1) {
            return;
        }

        StreamingRecognitionResult result = results.get(0);
        String transcript = result.getAlternatives(0).getTranscript().trim().toLowerCase();
        System.out.println("Transcript: " + transcript);

        if(transcript.startsWith("assistant")) {
            String command = transcript.replace("assistant", "").trim();
            if(command.isEmpty())
                return;
            switch (command) {
                case "hello there":
                    InputStream in = SpeechClient.class.getResourceAsStream("/general-kenobi.wav");
                    try {
                        byte[] data = IOUtils.toByteArray(in);
                        client.send(data);

                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    break;
                case "hello":
                    sendTextToClient("Hello Mr. Gralek.");
                    break;
                default:
                    String responseInText = commandResponder.response(transcript.trim(), clientContext);
                    System.out.println(responseInText);
                    sendTextToClient(responseInText);
                    break;
            }
        }
    }

    private void sendTextToClient(String message) {


        SynthesisInput input = SynthesisInput.newBuilder()
                .setSsml(SsmlDecorator.toSsmlText(message))
                .build();

        SynthesizeSpeechResponse response1 = textToSpeechClient.synthesizeSpeech(input, voice, audioConfig);
        client.send(response1.getAudioContent().toByteArray());
    }

    @Override
    public void onError(Throwable throwable) {
        logger.log(Level.WARNING, "recognize failed", throwable);
    }

    @Override
    public void onCompleted() {
        logger.info("recognize completed.");
        // Close the websocket
    }

    public void close() {
        if(textToSpeechClient != null && !textToSpeechClient.isShutdown()) {
            System.out.println("Closing text to speech");
            textToSpeechClient.close();
        }
        if(speech != null && !speech.isShutdown()) {
            System.out.println("Closing speech to text");
            speech.close();
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WebSocket that = (WebSocket) o;
        return client.getRemoteSocketAddress() == that.getRemoteSocketAddress();
    }

    @Override
    public int hashCode() {
        return Objects.hash(client.getRemoteSocketAddress());
    }
}
