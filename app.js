const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelectorAll('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //get the length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);

    //fake duration
    let fakedurtion = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    //play song
    play.addEventListener("click", () => {
        // song.play();
        checkPlaying(song);
    });

    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakedurtion = this.getAttributes("data-time");
// timeDisplay.textContent = `${Math.floor(fakedurtion / 60): ${Math.floor(fakedurtion % 60)}`;
        });
    });

    //create a specific stop and play 
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };
    //we can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakedurtion - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //animate the circle
        let progress = outlineLength - (currentTime / fakedurtion) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //animet the text
        timeDisplay.textContent = `${minutes}:${seconds}`;
    };
};



app();
