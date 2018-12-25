package com.gralek.shatee.web;

import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import com.gralek.shatee.domain.User;
import com.gralek.shatee.domain.UserTO;
import com.gralek.shatee.repository.UserRepository;
import com.gralek.shatee.security.SecurityService;
import com.gralek.shatee.service.UserService;
import com.gralek.shatee.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.*;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class AccessController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ResponseEntity<User> registration(@Valid @RequestBody UserTO user, BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // for extention
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(user.getPassword());
        newUser.setRole("ROLE_USER");

        User savedUser = userRepository.save(newUser);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }



    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ResponseEntity<User> login(Authentication auth) {
        User loggedUser = userRepository.findByUsername(auth.getName());
        return new ResponseEntity<>(loggedUser, HttpStatus.OK);
    }

    public static void main(String[] args) throws IOException, URISyntaxException {
        Path path = Paths.get(Objects.requireNonNull(AccessController.class.getClassLoader()
                .getResource("nlp/definition2.txt")).toURI());



        Stream<String> lines = Files.lines(path);
        byte[] bytes =
                lines
                .distinct()
                        .map(
                                e-> "<START> " + e.trim() + " <END>\n"

                        ).collect(Collectors.joining("")).getBytes();

        Files.write(Paths.get("./text.txt"), bytes);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(value = "/speech", method = RequestMethod.POST)
    public void speech(@RequestParam("file") MultipartFile file, @RequestParam("sampleRate") int sampleRate) throws IOException {
        System.out.println("incoming message ... " + file.getSize() + "bytes -- sampleRate" + sampleRate);
        byte[] bytes = file.getBytes();
        FileOutputStream fos = new FileOutputStream("MyAudio.wav");
        fos.write(bytes);
        fos.close();
        performRecogniton(bytes, sampleRate);
    }

    private void performRecogniton(byte[] data, int sampleRate) throws IOException {
        try (SpeechClient speechClient = SpeechClient.create()) {

            // The path to the audio file to transcribe
//            String fileName = "./resources/audio.raw";
//
//            // Reads the audio file into memory
//            Path path = Paths.get(fileName);
//            byte[] data = Files.readAllBytes(path);
            ByteString audioBytes = ByteString.copyFrom(data);

            // Builds the sync recognize request
            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                    .setSampleRateHertz(sampleRate)
                    .setLanguageCode("en-US")
                    .build();
            RecognitionAudio audio = RecognitionAudio.newBuilder()
                    .setContent(audioBytes)
                    .build();

            // Performs speech recognition on the audio file
            RecognizeResponse response = speechClient.recognize(config, audio);
            List<SpeechRecognitionResult> results = response.getResultsList();

            for (SpeechRecognitionResult result : results) {
                // There can be several alternative transcripts for a given chunk of speech. Just use the
                // first (most likely) one here.
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                System.out.printf("Transcription: %s%n", alternative.getTranscript());
            }
        }
    }

}
