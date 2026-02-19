class Visualizer {
    constructor(canvasId, networkStructure) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.structure = networkStructure; // e.g., [2, 3, 1]
        this.neurons = [];
        this.weights = []; // Array of matrices (or simplified objects for viz)
        this.biases = [];
        this.activations = []; // To store current activation levels for coloring
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = 400; // Fixed height or responsive
        this.calculatePositions();
        this.draw();
    }

    calculatePositions() {
        this.neurons = [];
        const layerCount = this.structure.length;
        const layerGap = this.canvas.width / (layerCount + 1);
        
        this.structure.forEach((neuronCount, layerIndex) => {
            const layerNeurons = [];
            const verticalGap = this.canvas.height / (neuronCount + 1);
            
            for (let i = 0; i < neuronCount; i++) {
                layerNeurons.push({
                    x: layerGap * (layerIndex + 1),
                    y: verticalGap * (i + 1),
                    value: 0 // Default activation
                });
            }
            this.neurons.push(layerNeurons);
        });
    }

    updateActivations(activations) {
        // Activations is an array of arrays/matrices matching the structure
        // e.g. [[0.5, 0.2], [0.1, 0.9, 0.4], [0.8]]
        if (!activations) return;
        
        activations.forEach((layerActs, lIdx) => {
            if (this.neurons[lIdx]) {
                this.neurons[lIdx].forEach((neuron, nIdx) => {
                    // Handle Matrix object or raw array
                    let val = 0;
                    if (layerActs.data) {
                        val = layerActs.data[nIdx][0];
                    } else if (Array.isArray(layerActs)) {
                        val = layerActs[nIdx];
                    }
                    neuron.value = val;
                });
            }
        });
        this.draw();
    }

    updateWeights(weights) {
        // weights is array of matrices
        this.weights = weights;
        this.draw();
    }

    draw() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections first
        // We iterate through layers from 0 to n-2 (since connections are between l and l+1)
        for (let l = 0; l < this.neurons.length - 1; l++) {
            const currentLayer = this.neurons[l];
            const nextLayer = this.neurons[l + 1];
            
            // Get weights for this connection set if available
            // weights[l] corresponds to connections between l and l+1
            // In standard notation weights[0] connects layer 0 to 1.
            const weightMatrix = this.weights[l];

            currentLayer.forEach((src, j) => {
                nextLayer.forEach((dest, i) => {
                    // w_ij is weight from neuron j in prev layer to neuron i in next layer
                    // In matrix form: W is (nextLayerSize x currentLayerSize)
                    // So weight is W.data[i][j]
                    let weight = 0;
                    if (weightMatrix && weightMatrix.data) {
                        weight = weightMatrix.data[i][j];
                    }

                    this.ctx.beginPath();
                    this.ctx.moveTo(src.x, src.y);
                    this.ctx.lineTo(dest.x, dest.y);
                    
                    // Style based on weight
                    const absWeight = Math.abs(weight);
                    this.ctx.lineWidth = Math.min(Math.max(absWeight * 2, 0.5), 5);
                    
                    if (weight > 0) {
                        this.ctx.strokeStyle = `rgba(0, 188, 212, ${Math.min(absWeight, 1)})`; // Cyan for positive
                    } else {
                        this.ctx.strokeStyle = `rgba(255, 64, 129, ${Math.min(absWeight, 1)})`; // Pink for negative
                    }
                    
                    this.ctx.stroke();
                });
            });
        }

        // Draw Neurons
        this.neurons.forEach((layer, lIdx) => {
            layer.forEach((neuron) => {
                this.ctx.beginPath();
                this.ctx.arc(neuron.x, neuron.y, 15, 0, Math.PI * 2);
                this.ctx.fillStyle = '#1e1e1e';
                this.ctx.fill();
                
                // Activation glow
                const brightness = Math.max(0, Math.min(1, neuron.value));
                this.ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
                this.ctx.fill();
                
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                
                // Text value (optional, maybe just for input/output)
                this.ctx.fillStyle = brightness > 0.5 ? '#000' : '#fff';
                this.ctx.font = '10px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(neuron.value.toFixed(2), neuron.x, neuron.y);
            });
        });
    }
}
