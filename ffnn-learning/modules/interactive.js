function setupSlider(id, callback) {
    const slider = document.getElementById(id);
    const display = document.getElementById(`${id}-val`);
    
    if (slider && display) {
        slider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            display.textContent = val.toFixed(2);
            if (callback) callback(val);
        });
        // Initial call
        if (callback) callback(parseFloat(slider.value));
    }
}

function drawGraph(canvasId, func, derivativeFunc, xRange = [-5, 5]) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw axes
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2); // X axis
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height); // Y axis
    ctx.stroke();
    
    // Scale
    const xScale = width / (xRange[1] - xRange[0]);
    const yScale = height / 4; // Arbitrary scale for Y
    
    // Draw Function
    ctx.strokeStyle = '#00bcd4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        const xVal = (x - width / 2) / xScale;
        const yVal = func(xVal);
        const y = height / 2 - yVal * yScale;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Derivative (optional, maybe dashed)
    if (derivativeFunc) {
        ctx.strokeStyle = '#ff4081';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
            const xVal = (x - width / 2) / xScale;
            const yVal = derivativeFunc(xVal);
            const y = height / 2 - yVal * yScale;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }
}
