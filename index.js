const sharp = require("sharp");
const videoshow = require("videoshow");

var images = [];
var input = [
  {
    name: "01.jpg",
    path: "./input/01.jpg",
    caption: "Ini adalah gambar 1",
  },
  {
    name: "02.jpg",
    path: "./input/02.jpg",
    caption: "Ini adalah gambar 2",
  },
  {
    name: "03.jpg",
    path: "./input/03.jpg",
    caption: "Ini adalah gambar 3",
  },
  {
    name: "04.jpg",
    path: "./input/04.jpg",
    caption: "Ini adalah gambar 4",
  },
];

async function resizeImage(array) {
  for (let i = 0; i < array.length; i++) {
    try {
      // Resize image
      await sharp(array[i].path)
        .resize({
          width: 1280,
          height: 720,
        })
        .toFile(`./image/${array[i].name}`);

      // Add to array
      images[i] = {
        path: `./image/${array[i].name}`,
        caption: array[i].caption,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

var videoOptions = {
  fps: 25,
  loop: 10, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: "libx264",
  size: "720x?",
  audioBitrate: "128k",
  audioChannels: 2,
  format: "mp4",
  pixelFormat: "yuv420p",
};

resizeImage(input).then(() => {
  videoshow(images, videoOptions)
    .audio("./audio/audio-01.mp3")
    .save("./output/output.mp4")
    .on("start", function (command) {
      console.log("ffmpeg process started:", command);
    })
    .on("error", function (err, stdout, stderr) {
      console.error("Error:", err);
      console.error("ffmpeg stderr:", stderr);
    })
    .on("end", function (output) {
      console.error("Video created in:", output);
    });
});
