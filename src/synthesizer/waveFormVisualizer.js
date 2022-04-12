export class WaveFormVisualizer {
    constructor(canvas, synth) {
        this.requestId = undefined;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.synth = synth;
        this.strokeColor = '#8fa3ff'
    }
    drawWaveform(values, bufferLength) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.beginPath();
        let sliceWidth = this.width * 1.0 / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
            const v = values[i] / 128.0;
            const y = v * this.height / 2;
            (i === 0) ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
            x += sliceWidth;
        }
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.stroke();
    }
    setColor(color) {
        this.strokeColor = color;
    }
    startAnimation() {
        if (!this.requestId)
            this.requestId = requestAnimationFrame(this.updateAnimation.bind(this));
    }
    stopAnimation() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }
    updateAnimation() {
        this.synth.analyserNode.getByteTimeDomainData(this.synth.data);
        this.drawWaveform(this.synth.data, this.synth.bufferLength);
        this.requestId = undefined;
        this.startAnimation();
    }
}
