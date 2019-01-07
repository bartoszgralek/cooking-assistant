let ws;
let recording = false;
let AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();
let blob;
let mute = false;

export function init() {

    ws = new WebSocket("ws://localhost:8887");
    ws.onopen = function () {
        console.log("Opened connection to websocket");
    };

    ws.onclose = function () {
        console.log("Closing connecting to websocket");
    };

    ws.onmessage = event => {
        let data = event.data;
        blob = new Blob([data], {type : 'audio/wav'});
        //playByteArray(blob);
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        audio.addEventListener("playing", () => {
            console.log("playing");
            mute = true;
        });

        audio.addEventListener("ended", () => {
            console.log("ended");
            mute = false;
        });

        audio.play();
    };

    let AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();

    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia){

        navigator.getUserMedia({audio:true},handleSuccess,
            function(e) {
                alert('Error capturing audio.');
            }
        );

    } else { alert('getUserMedia not supported in this browser.'); }

    // navigator.mediaDevices.getUserMedia({audio: true})
    //     .then(handleSuccess);

}

export function play(recipeId) {
    ws.send("START:" + JSON.stringify({sampleRate: context.sampleRate, recipeId: recipeId}));
    recording = true;
    mute = false;
}

export function stop() {
    ws.send("END:");
    recording = false;
    mute = false;
}

export function close() {
    if (ws != null) {
        ws.close();
    }
    console.log("Disconnected");
}

function handleSuccess(stream) {
    let source = context.createMediaStreamSource(stream);
    let processor = context.createScriptProcessor(2048, 1, 1);

    source.connect(processor);
    processor.connect(context.destination);
    let MAX_INT = Math.pow(2, 16 - 1) - 1;

    processor.addEventListener('audioprocess', function(event) {
        if(!recording) return;
        console.log ('recording');
        let left = event.inputBuffer.getChannelData(0);
        if(mute) {
            ws.send(new Int16Array(4092));
        }else {
            ws.send(Int16Array.from(left.map(function (n) {
                return n * MAX_INT;
            })));
        }

    });
}