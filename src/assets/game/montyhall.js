(function () {
    //window.addEventListener('resize', resizeCanvas);
    // Get the canvas element
    const canvas = document.getElementById('gameCanvas');
    const audio_slider = document.getElementById('audio-slider');
    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height;
    const ctx = canvas.getContext('2d');
    const backgroundImage = new Image();
    const backgroundAudio = new Audio();

    // Setup
    setup();

    // Render the scene
    render();

    function setup() {
        backgroundImage.onload = function () {
            // Draw the image onto the canvas with adjusted dimensions
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        };
        backgroundImage.src = "/assets/img/MontyHall/Montyh.jpg";
        resizeCanvas();

        backgroundAudio.autoplay = false;
        backgroundAudio.loop = false;
        backgroundAudio.src = "/assets/audio/MontyHall_ro.mp3";
        backgroundAudio.play();

    }

    // Function to render the scene
    function render() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(render);
    }

    function pauseAudio(){
        backgroundAudio.pause();
    }

    function resizeCanvas() {
        const aspectRatio = 16 / 9; // Example aspect ratio (16:9)
        const containerWidth = canvas.offsetWidth;
        const containerHeight = containerWidth / aspectRatio; // Calculate height based on aspect ratio

        // Set canvas dimensions
        canvas.width = containerWidth;
        canvas.height = containerHeight;

        audio_slider.style.width =  canvas.width-10 + 'px';
        // Redraw content if needed
        // (This is where you would redraw any content on the canvas)
    }
})();
