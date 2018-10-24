package com.gralek.shatee.handler;

import com.google.api.gax.rpc.ApiStreamObserver;
import com.google.api.gax.rpc.BidiStreamingCallable;
import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class SpeechHandler extends BinaryWebSocketHandler implements ApiStreamObserver<StreamingRecognizeResponse> {

    private static final Logger logger = Logger.getLogger(SpeechHandler.class.getName());
    ApiStreamObserver<StreamingRecognizeRequest> requestObserver;
    SpeechClient speech;

    public SpeechHandler() {
        try {
            speech = SpeechClient.create();
            BidiStreamingCallable<StreamingRecognizeRequest, StreamingRecognizeResponse> callable =
                    speech.streamingRecognizeCallable();

            requestObserver = callable.bidiStreamingCall(this);
            // Build and send a StreamingRecognizeRequest containing the parameters for
            // processing the audio.
            RecognitionConfig config =
                    RecognitionConfig.newBuilder()
                            .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                            .setSampleRateHertz(48000)
                            .setLanguageCode("en-US")
                            .build();
            StreamingRecognitionConfig streamingConfig =
                    StreamingRecognitionConfig.newBuilder()
                            .setConfig(config)
                            .setInterimResults(true)
                            .setSingleUtterance(false)
                            .build();

            StreamingRecognizeRequest initial =
                    StreamingRecognizeRequest.newBuilder().setStreamingConfig(streamingConfig).build();
            requestObserver.onNext(initial);

        } catch (IOException e) {
            logger.log(Level.WARNING, "Error onWebSocketText", e);
        }
    }

    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
        byte[] data = message.getPayload().array();
        StreamingRecognizeRequest request =
                StreamingRecognizeRequest.newBuilder()
                        .setAudioContent(ByteString.copyFrom(data, 0, data.length))
                        .build();
        requestObserver.onNext(request);
    }

    public void closeApiChannel() {
        speech.close();
    }


    @Override
    public void onNext(StreamingRecognizeResponse response) {
        List<StreamingRecognitionResult> results = response.getResultsList();
        if (results.size() < 1) {
            return;
        }

        StreamingRecognitionResult result = results.get(0);
        logger.info("Got result " + result);
        String transcript = result.getAlternatives(0).getTranscript();
        System.out.println("Transcript: " + transcript);
    }

    @Override
    public void onError(Throwable throwable) {
        logger.log(Level.WARNING, "recognize failed", throwable);
        // Close the websocket
    }

    @Override
    public void onCompleted() {
        logger.info("recognize completed.");
        // Close the websocket
    }
}
