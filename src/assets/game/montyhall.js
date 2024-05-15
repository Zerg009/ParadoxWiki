(function () {
    // Get the canvas element
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width;
    const CANVAS_HEIGHT = canvas.height = canvas.width;

    // Game variables
    let cameraX = 0; // Camera position


    // Objects to render
    const objects = [
        
        { x: 100, y: 100, width: 50, height: 50, color: 'red' },
        { x: 200, y: 150, width: 30, height: 30, color: 'blue' },
        // Add more objects as needed
    ];
    const backgroundImage = new Image();
    backgroundImage.src = "/assets/img/MontyHall/Montyhall_closed_doors.jpg";
    

    backgroundImage.onload = function() {
        // Draw the image starting from the top-left corner of the canvas
        ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      };
    // Function to render the scene
    // function render() {
    //     // Clear the canvas
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     // Render objects based on the camera position
    //     for (const obj of objects) {
    //         const renderX = obj.x - cameraX;
    //         ctx.fillStyle = obj.color;
    //         ctx.fillRect(renderX, obj.y, obj.width, obj.height);
    //     }

    //     requestAnimationFrame(render);
    // }

    // Update camera position
    function updateCamera(newCameraX) {
        cameraX = newCameraX;
    }

    // Render the scene
    render();
})();



