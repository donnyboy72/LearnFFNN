function setupSlider(id, callback) {
    const slider = document.getElementById(id);
    const display = document.getElementById(`${id}-val`);
    
    if (slider) {
        slider.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (display) display.textContent = val.toFixed(2);
            if (callback) callback(val);
        });
        // Initial call
        if (callback) callback(parseFloat(slider.value));
    }
}

function drawGraph(canvasId, func, derivativeFunc, activeX = null, xRange = [-5, 5]) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Scale
    const xScale = width / (xRange[1] - xRange[0]);
    const yScale = height / 5; // Reduced scale to fit ReLU better
    const centerY = height * 0.7; // Lower center to allow more room for positive values
    const centerX = width / 2;
    
    // Draw axes
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY); // X axis
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height); // Y axis
    ctx.stroke();
    
    // Draw Function
    ctx.strokeStyle = '#00bcd4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < width; x++) {
        const xVal = (x - centerX) / xScale;
        const yVal = func(xVal);
        const y = centerY - yVal * yScale;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw Derivative
    if (derivativeFunc) {
        ctx.strokeStyle = '#ff4081';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
            const xVal = (x - centerX) / xScale;
            const yVal = derivativeFunc(xVal);
            const y = centerY - yVal * yScale;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Draw active point
    if (activeX !== null) {
        const x = centerX + activeX * xScale;
        const yVal = func(activeX);
        const y = centerY - yVal * yScale;
        
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#00bcd4';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
