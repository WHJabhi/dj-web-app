song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

scoreRightwrist = 0;
scoreLeftwrist = 0;

rightwristX = 0;
rightwristY = 0;

lefttwristX = 0;
leftwristY = 0;

function preload(){
    song1 = loadSound("mehebooba.mp3");
    song2 = loadSound("Khairiyat.mp3");
}
function setup(){
    canvas = createCanvas (600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoded);
    poseNet.on('pose',gotPoses);
}
function modelLoded(){
    console.log('PoseNet is initialized');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightwrist = results[0].pose.keypoints[10].score;
        scoreLefttwrist = results[0].pose.keypoints[9].score;
    
        console.log("rightWrist = "+scoreRightwrist);
        console.log("leftWrist = "+scoreLeftwrist);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
    }
}
function draw(){
    image(video,0,0,600,500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("blue");

    stroke("blue");
    if(scoreRightwrist>0.01)
    {
        console.log("rightWrist = "+scoreRightwrist);
        circle(rightwristX,rightwristY,20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing_mehebooba";
        }
    }
    if(scoreLeftwrist>0.01)
    {
        console.log("leftWrist = "+scoreLeftwrist);
        circle(leftwristX,leftwristY,20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing_Khairiyat";
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}