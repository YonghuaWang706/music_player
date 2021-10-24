// window.onload = function() {
//     var ctx = new AudioContext();
//     var audio = document.getElementById('myAudio');
//     var audioSrc = ctx.createMediaElementSource(audio);
//     var analyser = ctx.createAnalyser();
//     // we have to connect the MediaElementSource with the analyser
//     audioSrc.connect(analyser);
//     audioSrc.connect(ctx.destination);
//     // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
//
//     // frequencyBinCount tells you how many values you'll receive from the analyser
//     var frequencyData = new Uint8Array(analyser.frequencyBinCount);
//
//     // we're ready to receive some data!
//     // loop
//     function renderFrame() {
//         requestAnimationFrame(renderFrame);
//         // update data in frequencyData
//         analyser.getByteFrequencyData(frequencyData);
//         // render frame based on values in frequencyData
//         // console.log(frequencyData)
//     }
//     audio.start();
//     renderFrame();
// };
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const overlay = document.getElementById('overlay')
const content = document.getElementById('content')
const title = document.getElementById('title')
const playBtn = document.getElementById('play')

const volume = document.getElementById('volume'),
    pauseBtn = document.getElementById('pause'),
    playSet = document.getElementById('playSet'),
    mute = document.getElementById('mute'),
    loopBox = document.getElementById('loop'),
    currentSong = document.getElementById('currentSong')

// const hatenaBtn = document.getElementById('hatena'),
//     sawanoBtn = document.getElementById('sawano'),
//     reonaBtn = document.getElementById('reona'),
//     lisaBtn = document.getElementById('lisa'),
//     utadaBtn = document.getElementById('utada'),
//     sasanomalyBtn = document.getElementById('sasanomaly'),
//     aimerBtn = document.getElementById('aimer'),
//     lynBtn = document.getElementById('lyn')
const whiteAlbumBtn = document.getElementById('whiteAlbum'),
    soundOfDestinyBtn = document.getElementById('soundOfDestiny'),
    dontSayLazyBtn = document.getElementById('dontSayLazy'),
    loveWarBtn = document.getElementById('loveWar')
const noLazy = "https://cdn.glitch.me/038f8694-acd7-4a20-8052-9849e644d6ea%2F038.%E3%80%90%E3%81%91%E3%81%84%E3%81%8A%E3%82%93%EF%BC%81%E3%80%91%E6%A1%9C%E9%AB%98%E8%BB%BD%E9%9F%B3%E9%83%A8%20-%20Don't%20Say%20'Lazy'.flac?v=1635051202866"
const soundOfDestiny = "https://cdn.glitch.me/038f8694-acd7-4a20-8052-9849e644d6ea%2FSOUND_OF_DISTINY.mp3?v=1635051343247"
const WA = "https://cdn.glitch.me/038f8694-acd7-4a20-8052-9849e644d6ea%2FWHITE_ALBUM.mp3?v=1635051349725"
const loveWar = "https://cdn.glitch.me/038f8694-acd7-4a20-8052-9849e644d6ea%2F%E9%88%B4%E6%9C%A8%20%E9%9B%85%E4%B9%8B%20-%20%E3%83%A9%E3%83%96%E3%83%BB%E3%83%89%E3%83%A9%E3%83%9E%E3%83%86%E3%82%A3%E3%83%83%E3%82%AF%20feat.%20%E4%BC%8A%E5%8E%9F%E5%85%AD%E8%8A%B1%20%20(89%20Sec.TV%20Size%20Version).flac?v=1635051377928"


const defaultColor = document.getElementById('default'),
    red = document.getElementById('redGradient'),
    green = document.getElementById('greenGradient'),
    blue = document.getElementById('blueGradient'),
    purple = document.getElementById('purpleGradient')

let color = 'white';

//audio init
const audioCtx = new AudioContext()
const audioElement = document.createElement('audio')
document.body.appendChild(audioElement)

//Starts audio setup and visualization
const start = function () {

    //audio graph setup
    // expose audio time and frequency data and create data visualisations.
    const analyser = audioCtx.createAnalyser()
    //unsigned long value and represents the
    // window size in samples that is used
    // when performing a Fast Fourier Transform
    // (FFT) to get frequency domain data.
    analyser.fftSize = 1024
    // create a new MediaElementAudioSourceNode object,
    // given an existing HTML <audio> or <video> element,
    // the audio from which can then be played and manipulated.
    const player = audioCtx.createMediaElementSource(audioElement)
    //actual audio-rendering device such as your device's speakers
    player.connect(audioCtx.destination)
    player.connect(analyser)

    audioElement.src = WA
    audioElement.play()
    //CORS requests for this element will have the credentials
    // flag set to 'same-origin'.
    audioElement.crossOrigin = "anonymous";

    currentSong.value = whiteAlbumBtn.value
//unsigned integer half that of the AnalyserNode.fftSize.
// This generally equates to the number of data values you
// will have to play with for the visualization.
    const results = new Uint8Array(analyser.frequencyBinCount)

    let draw = function () {
        window.requestAnimationFrame(draw)

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = color

        analyser.getByteFrequencyData(results)

        for (let i = 0; i < analyser.frequencyBinCount; i++) {
            ctx.fillRect(i, canvas.height, 3, -results[i])
        }
    }
    draw()
}

//Play button on the instructions screen
playBtn.addEventListener('click', function () {
    document.body.removeChild(overlay)
    document.body.removeChild(title)
    content.style.display = 'block'
    audioCtx.resume()
    start()
})

//Settings menu
playSet.addEventListener('click', ()=> audioElement.play())
pauseBtn.addEventListener('click', ()=> audioElement.pause())
volume.addEventListener("change", (e)=> audioElement.volume = e.currentTarget.value / 100)

mute.addEventListener('click', function() {
    if (mute.checked) {
        audioElement.muted = true
    } else {
        audioElement.muted = false
    }
})

loopBox.addEventListener('click', function() {
    if (loopBox.checked) {
        audioElement.loop = true
    } else {
        audioElement.loop = false
    }
})

//Plays selected song when clicked
whiteAlbumBtn.addEventListener('click', function () {
    audioElement.src = WA
    audioElement.play()
    currentSong.value = whiteAlbumBtn.value
})
dontSayLazyBtn.addEventListener('click', function () {
    audioElement.src = noLazy
    audioElement.play()
    currentSong.value = dontSayLazyBtn.value
})
soundOfDestinyBtn.addEventListener('click', function () {
    audioElement.src =soundOfDestiny
    audioElement.play()
    currentSong.value = soundOfDestinyBtn.value
})
loveWarBtn.addEventListener('click', function () {
    audioElement.src = loveWar
    audioElement.play()
    currentSong.value = loveWarBtn.value
})


//Changes color of audio wave when clicked
defaultColor.addEventListener('click', ()=> color = 'white')

red.addEventListener('click', function () {
    let gradient = ctx.createLinearGradient(170, 0, 0, 0)
    gradient.addColorStop(0, "#D67F74")
    gradient.addColorStop(1, "#D63936")
    color = gradient;
})

green.addEventListener('click', function () {
    let gradient = ctx.createLinearGradient(170, 0, 0, 0)
    gradient.addColorStop(0, "#91D6C3")
    gradient.addColorStop(1, "#32D6AC")
    color = gradient;
})

blue.addEventListener('click', function () {
    let gradient = ctx.createLinearGradient(0, 0, 170, 0)
    gradient.addColorStop(0, "#0087F5")
    gradient.addColorStop(1, "#7DC6E0")
    color = gradient;
})

purple.addEventListener('click', function () {
    let gradient = ctx.createLinearGradient(170, 0, 0, 0)
    gradient.addColorStop(0, "#B89FD6")
    gradient.addColorStop(1, "#9563D6")
    color = gradient;
})