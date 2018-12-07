package com.gralek.shatee.speech;

import org.apache.commons.io.IOUtils;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import sun.audio.AudioData;
import sun.audio.AudioDataStream;
import sun.audio.AudioPlayer;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class SpeechWebSocket extends WebSocketServer{

    private static Set<SpeechClient> clients;

    public SpeechWebSocket(int port) {
        super(new InetSocketAddress(port));
    }

    @Override
    public void onStart() {
        System.out.println("WebSocketServer started at: " + this.getAddress());
        clients = Collections.synchronizedSet(new HashSet<>());
    }

    @Override
    public void onOpen(WebSocket webSocket, ClientHandshake clientHandshake) {
        System.out.println("Connection established " + webSocket.getRemoteSocketAddress() + " " + clientHandshake.getResourceDescriptor());
        SpeechClient client = new SpeechClient(webSocket);
        clients.add(client);
        //client.run();
    }

    @Override
    public void onMessage(WebSocket webSocket, String message) {
        synchronized (clients) {
            for (SpeechClient client : clients) {
                if (client.getClient().equals(webSocket)) {
                    client.onMessage(message);
                    //client.initialize(message);
                }
            }
        }
    }

    @Override
    public void onMessage( WebSocket webSocket, ByteBuffer data ) {
        synchronized (clients) {
            for(SpeechClient client : clients) {
                if (client.getClient().equals(webSocket)) {
                    client.onMessage(data);
                }
            }
        }
    }

    @Override
    public void onError(WebSocket webSocket, Exception e) {
        System.out.println("Error with websocket server: "+ e);
        e.printStackTrace();
    }

    @Override
    public void onClose(WebSocket webSocket, int code, String reason, boolean remote) {
        System.out.println("Connection closed " + webSocket.getRemoteSocketAddress());
        synchronized (clients) {
            for(SpeechClient client : clients) {
                if(client.equals(webSocket)) {
                    client.close();
                    clients.remove(client);

                }
            }
        }
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
}
