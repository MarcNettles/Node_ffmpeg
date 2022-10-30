const express = require("express");
const app = express();
const port = 3000;
var ffmpeg = require('ffmpeg');
/************************************************************/

const f_ffmpeg = require('fluent-ffmpeg') 

const source = "sample.mp4"




/************************************************************/
app.set('view engine', 'pug');



app.get('/', (req,res) =>{
    var process = new ffmpeg(source)
    process.then(function(video) {
        video
        .save('/cut/new_sample.mp4', function(error, file){
            if(!error)
            {
                console.log('Video file: ' + file);
            }
        })
    })
});

/*
app.get('/', (req,res) =>{
    try{
        var process = new ffmpeg(source);
        process.then(function(video){
            video
            .save('/cut/new_sample.mp4', function(error, file){
                if(!error)
                {
                    console.log('Video file: ' + file);
                }
            });
        }, function(err){
            console.log('Error: ' +err);
        });
    } catch(e){
        console.log(e.code);
        console.log(e.msg);
    }
});
*/
/*
app.get('/', (req,res) =>{
    try{
        console.log("Trying to process video.");
        var process = new ffmpeg(source);
        console.log("Passed var process = new ffmpeg(source)");
        process.then(function(video) {
            console.log("Inside process.then")
            video
            .setVideoStartTime(13)
            .setVideoDuration(10)
            .save('/cut/new_sample.mp4', function(error, file){
                if(!error)
                {
                    console.log('Video file', + file);
                }
                else{
                    console.log('Error'+error)
                }
            });
    
        }, function(err){
            console.log('Error: '+err);
        });
    } catch(e){
        console.log(e.code);
        console.log(e.msg);
    }
});
*/
app.listen(port);