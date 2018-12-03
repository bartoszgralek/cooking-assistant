let hark = require('hark');
let axios = require('axios');
let Recorder = require('./recorder.js').Recorder;

let recorder;
let audio_context;
let execute = false;

export function init() {
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    audio_context = new AudioContext();

    console.log(audio_context.sampleRate);

    navigator.mediaDevices.getUserMedia({audio: true})
        .then(handleSuccess);
}

export function play() {
    execute = true;
}

export function stop() {
    execute = false;
    recorder.stop();
    recorder.clear();
}

function handleSuccess(stream) {

    var input = audio_context.createMediaStreamSource(stream);
    recorder = new Recorder(
        input,
        {
            sampleRate: audio_context.sampleRate,
            numChannels: 1
        }
    );

    let options = {
        interval: 5,
        threshold: -70
    };
    let speechEvents = hark(stream, options);

    let toggle = null;
    let recording = false;

    speechEvents.on('speaking', function() {
        if(!recording && execute) {
            recorder.record();
            recording = true;
            console.log("is recording");
        }

        if(toggle !== null) {
            clearTimeout(toggle);
            recorder.clear();
        }
    });

    speechEvents.on('stopped_speaking', function() {

        toggle = setTimeout(function(){
            if(recording && execute) {
                console.log("is generating");
                recorder.stop();
                recorder.exportWAV(function(blob) {
                    sendAudio(blob);
                });
                recorder.clear();
                recording = false;
            }
        }, 500);
    });

    function sendAudio(audio) {
        axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa("user:user");
        let formData = new FormData();
        formData.append("file", audio);
        formData.append("sampleRate", audio_context.sampleRate);
        axios.post('http://localhost:8080/speech', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}