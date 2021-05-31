Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
prediction = "";

camera = document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    });
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/MVWwRZfhb/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speechData = "The prediction is " + prediction;
    var utterthis = new SpeechSynthesisUtterance(speechData);
    synth.speak(utterthis);
}

function check() {
    image = document.getElementById("captured_image")
    classifier.classify(image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results.label;
        prediction = results.label;
        speak();
        if (results.label = "Amazing") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
        }
        if (results.label = "Victory") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
        }
        if (results.label = "Best") {
            document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
        }
    }
}