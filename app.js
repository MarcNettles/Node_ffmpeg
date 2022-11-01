/*
* Marc Nettles CSCI 4308 Senior Capstone Team Digiclips
*
* Here I have set up a basic node.js server to test different methods of calling ffmpeg to cut a video.
* So far, this yields the best results. I tried using just the ffmpeg node package, but wasn't having much luck. It just wasn't doing anything.
* Then I tried fluent-ffmpeg, and I was still having issues.
* Now, I'm using ffmpeg-cli (go to root directory of your node.js server, open a terminal so you're at the root directory of that server, and type npm install ffmpeg-cli)
* 
* You'll also need to do "npm install express"
* In this basic example, I have a file called "sample.mp4" sitting in the root directory and will be outputting a clipped 10s version "output.mp4"
* located in the root directory as well.
*/

// The sponsor uses express, so we will too.
const express = require("express");
const app = express();
const port = 3000;

// Here we require ffmpeg-cli, which we'll use ffmpeg.runSync(). We can also run aync by using ffmpeg.run(), which returns a Promise.
// Learn more here: https://www.npmjs.com/package/ffmpeg-cli
const ffmpeg = require("ffmpeg-cli");
ffmpeg.run("-version");
console.log(ffmpeg.runSync("-version"));


const source = "sample.mp4"


// The sponsor uses pug, so we will too.
app.set('view engine', 'pug');


// Route when we go to "http://localhost:" + port + "/"
app.get('/', (req,res) =>{ // (req,res) is likely where we'll be getting our start and end times from.

    // commands to feed into ffmpeg.runSync(commands). It's exactly what you'd type into the command line interface (hence the -cli part of ffmpeg-cli).
    // -c:v copy -c:a copy speeds up our time to cut the video because it reuses the video and audio from the old clip so we don't have to reencode it.
    commands = "-i " + source + " -ss 00:00:05 -t 00:00:15 -c:v copy -c:a copy output.mp4";
    ffmpeg.runSync(commands); // returns a promise
});

// Run the server on port port.
app.listen(port);