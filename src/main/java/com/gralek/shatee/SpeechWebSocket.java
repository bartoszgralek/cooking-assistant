package com.gralek.shatee;

import com.google.api.gax.rpc.ApiStreamObserver;
import com.google.api.gax.rpc.BidiStreamingCallable;
import com.google.cloud.speech.v1.*;
import com.google.cloud.texttospeech.v1.*;
import com.google.gson.Gson;
import com.google.protobuf.ByteString;
import com.gralek.shatee.domain.Step;
import com.gralek.shatee.handler.Constraints;
import com.gralek.shatee.nlp.IntentTrainer;
import com.gralek.shatee.nlp.IntentTrainerResponse;
import com.gralek.shatee.repository.RecipeRepository;
import com.gralek.shatee.utils.ApplicationContextUtils;
import org.apache.commons.io.IOUtils;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.springframework.context.ApplicationContext;
import sun.audio.AudioData;
import sun.audio.AudioDataStream;
import sun.audio.AudioPlayer;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

public class SpeechWebSocket extends WebSocketServer implements ApiStreamObserver<StreamingRecognizeResponse>{

    private static final Logger logger = Logger.getLogger(SpeechWebSocket.class.getName());
    private ApiStreamObserver<StreamingRecognizeRequest> requestObserver;
    private SpeechClient speech;
    private TextToSpeechClient textToSpeechClient;
    private VoiceSelectionParams voice;
    private AudioConfig audioConfig;
    private Gson gson = new Gson();
    private WebSocket client;

    private RecipeRepository recipeRepository;

    private IntentTrainer intentTrainer;


    public SpeechWebSocket(int port) {
        super(new InetSocketAddress(port));

        ApplicationContext applicationContext = ApplicationContextUtils.getApplicationContext();

        this.recipeRepository = (RecipeRepository) applicationContext.getBean("recipeRepository");
        this.intentTrainer = (IntentTrainer) applicationContext.getBean("intentTrainer");
        System.out.println(intentTrainer.categorizeSentence("Could you please tell me what salt is?"));
    }

    public SpeechWebSocket( InetSocketAddress address ) {
        super( address );
    }

    @Override
    public void onOpen(WebSocket webSocket, ClientHandshake clientHandshake) {
        client = webSocket;
        System.out.println("Connection established " + webSocket.getRemoteSocketAddress() + " " + clientHandshake.getResourceDescriptor());
    }

    @Override
    public void onClose(WebSocket webSocket, int code, String reason, boolean remote) {
        System.out.println("Connection closed " + webSocket.getRemoteSocketAddress() + " " + code + " " +
                reason + " " + remote);
        client = null;
        speech.close();
    }

    @Override
    public void onMessage(WebSocket webSocket, String message) {
        if(webSocket.isOpen()) {
            Constraints constraints = gson.fromJson(message, Constraints.class);
            logger.info(String.format("Got sampleRate: %s", constraints.sampleRate));

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

                speech = SpeechClient.create();
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

                webSocket.send(message);
            } catch (IOException e) {
                logger.log(Level.WARNING, "Error onWebSocketText", e);
            }


        }

    }

    @Override
    public void onMessage( WebSocket webSocket, ByteBuffer message ) {
        if(webSocket.isOpen()) {
            byte[] data = message.array();
            StreamingRecognizeRequest request =
                    StreamingRecognizeRequest.newBuilder()
                            .setAudioContent(ByteString.copyFrom(data, 0, data.length))
                            .build();
            requestObserver.onNext(request);
        }
    }

    @Override
    public void onError(WebSocket webSocket, Exception e) {
        System.out.println("Error: "+ e);
    }

    @Override
    public void onStart() {
        System.out.println("WebSocketServer started");

    }

    public static void main(String[] args) throws IOException {
        InputStream in = SpeechWebSocket.class.getResourceAsStream("/output.wav");
        byte[] data = IOUtils.toByteArray(in);

        AudioData audiodata = new AudioData(data);
        // Create an AudioDataStream to play back
        AudioDataStream audioStream = new AudioDataStream(audiodata);
        // Play the sound
        AudioPlayer.player.start(audioStream);

    }

    @Override
    public void onNext(StreamingRecognizeResponse response) {
        List<StreamingRecognitionResult> results = response.getResultsList();
        if (results.size() < 1) {
            return;
        }

        StreamingRecognitionResult result = results.get(0);
        //logger.info("Got result " + result);
        String transcript = result.getAlternatives(0).getTranscript();
        System.out.println("Transcript: " + transcript);
        System.out.println("ASCII representation: " + Arrays.toString(stringToBytesASCII(transcript)));
        if(transcript.trim().equals("hello")) {
            System.out.println("in hello condition");
//            InputStream in = SpeechWebSocket.class.getResourceAsStream("/output.wav");
//            try {
//                byte[] data = IOUtils.toByteArray(in);
//                client.send(data);
//
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
            sendTextToClient("Hello, Mr. Gralek");

        }else if(transcript.trim().equals("hello there")) {
            InputStream in = SpeechWebSocket.class.getResourceAsStream("/general-kenobi.wav");
            try {
                byte[] data = IOUtils.toByteArray(in);
                client.send(data);

            } catch (IOException e) {
                e.printStackTrace();
            }
        }else if(transcript.trim().equals("recipe")) {
            sendTextToClient(recipeRepository.findById(1L).get()
                    .getSteps()
                        .stream()
                        .map(Step::getDescription)
                        .collect(Collectors.joining(",")));
        }
    }

    public static byte[] stringToBytesASCII(String str) {
        byte[] b = new byte[str.length()];
        for (int i = 0; i < b.length; i++) {
            b[i] = (byte) str.charAt(i);
        }
        return b;
    }

    private void sendTextToClient(String message) {
        SynthesisInput input = SynthesisInput.newBuilder()
                .setText(message)
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
}
