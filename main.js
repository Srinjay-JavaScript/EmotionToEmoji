var prediction1;
var prediction2;

function speak(){
    var synth = window.speechSynthesis;
    var data1 = "The emoji for prediction 1 is" + prediction1;
    var data2 = "The emoji for prediction 2 is" + prediction2;
    var utter = new SpeechSynthesisUtterance(data1 + data2);
    synth.speak(utter);
}
Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 100,
});
Webcam.attach("#result");

function take_snap(){
 Webcam.snap(function(data_uri){
  document.getElementById("photo").innerHTML = "<img style='width:350px; border-radius: 25px; height: 300px;'src= '"+ data_uri + "' id='img_taken'></img>";
 });
}

console.log("ML5 version: "+ ml5.version);
brain_finder = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XgMphg_oy/model.json", loaded);
function loaded(){
    console.log("MODEL LOADED!")
}
function predict(){
  var pic = document.getElementById("img_taken");
brain_finder.classify(pic, result)
}
function result(error, finalResult){
if (error){
  console.error(error);
}
else{
  console.log(finalResult);
  prediction1 = finalResult[0].label;
  prediction2 = finalResult[1].label;
  speak();
  document.getElementById("emname").innerHTML = prediction1;
  document.getElementById("emname2").innerHTML = prediction2;
  //PREDICTION 1
  if(prediction1.toLowerCase() == "happy"){
    document.getElementById("emoji").innerHTML = "&#128512";
    document.getElementById("emname").style.color= "green";
  }
  else if(prediction1.toLowerCase() == "crying"){
    document.getElementById("emoji").innerHTML = "&#128546;";
    document.getElementById("emname").style.color= "blue";
  }
  else if(prediction1.toLowerCase() == "sad"){
    document.getElementById("emoji").innerHTML = "&#128532;";
    document.getElementById("emname").style.color= "orange";
  }
  else if(prediction1.toLowerCase() == "angry"){
    document.getElementById("emoji").innerHTML = "&#128545;";
    document.getElementById("emname").style.color= "red";
  }
  //PREDICTION 2
  if(prediction2.toLowerCase() == "happy"){
    document.getElementById("emoji2").innerHTML = "&#128512";
    document.getElementById("emname2").style.color= "green";
  }
  else if(prediction2.toLowerCase() == "crying"){
    document.getElementById("emoji2").innerHTML = "&#128546;";
    document.getElementById("emname2").style.color= "blue";
  }
  else if(prediction2.toLowerCase() == "sad"){
    document.getElementById("emoji2").innerHTML = "&#128532;";
    document.getElementById("emname2").style.color= "orange";
  }
  else if(prediction2.toLowerCase() == "angry"){
    document.getElementById("emname2").style.color= "red";
  document.getElementById("emoji2").innerHTML = "&#128545;";
  }


  

}
}
