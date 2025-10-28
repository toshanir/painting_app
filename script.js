window.onload = function () {
    // Canvas setup
    const canvas = document.getElementById("paint-canvas");
    const context = canvas.getContext("2d");
    const boundings = canvas.getBoundingClientRect();

    // Initial settings
    let mouseX = 0;
    let mouseY = 0;
    let isDrawing = false;
    context.strokeStyle = "black";
    context.lineWidth = document.getElementById("brush").value;

    // Brush size control
    const brush = document.getElementById("brush");
    brush.addEventListener("input", function (e) {
        context.lineWidth = e.target.value;
    });

    // Color selection
    const colors = document.querySelector(".colors");
    colors.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            context.strokeStyle = event.target.value || "black";
        }
    });

    // Mouse events
    canvas.addEventListener("mousedown", function (event) {
        setMouseCoordinates(event);
        isDrawing = true;
        context.beginPath();
        context.moveTo(mouseX, mouseY);
    });

    canvas.addEventListener("mousemove", function (event) {
        setMouseCoordinates(event);
        if (isDrawing) {
            context.lineTo(mouseX, mouseY);
            context.stroke();
        }
    });

    canvas.addEventListener("mouseup", function () {
        isDrawing = false;
    });

    // Get mouse coordinates relative to canvas
    function setMouseCoordinates(event) {
        mouseX = event.clientX - boundings.left;
        mouseY = event.clientY - boundings.top;
    }

    // Clear button
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Save button
    const saveButton = document.getElementById("save");
    saveButton.addEventListener("click", function () {
        const imageName = prompt("Please enter image name");
        const canvasDataURL = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = canvasDataURL;
        a.download = (imageName || "drawing") + ".png";
        a.click();
    });

    // Transparency slider — simple and working
    const slider = document.getElementById("transparent");

    // Set initial transparency
    context.globalAlpha = slider.value / 100;

    // Update transparency live
    slider.addEventListener("input", function () {
        context.globalAlpha = this.value / 100;
    });
};
