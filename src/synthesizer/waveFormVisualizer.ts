import Synthetizer from './Synthetizer';

export class WaveFormVisualizer {
    ctx: CanvasRenderingContext2D | null;
    synth: Synthetizer;
    canvas: HTMLCanvasElement;
    requestId: number | undefined;
    width: number;
    height: number;
    strokeColor: string;


    constructor(canvas: HTMLCanvasElement, synth: Synthetizer, fftSize: number) {
        this.requestId = undefined;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.synth = synth;
        this.strokeColor = '#8fa3ff';
    }

    drawWaveform(buffer: Uint8Array) {
        if (this.ctx) {

            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = this.strokeColor;
            this.ctx.beginPath();

            const sliceWidth = this.width / buffer.length;
            for (let i = 0; i < buffer.length; i += 8) {
                const percent = buffer[i] / 256
                const x = i * sliceWidth;
                const y = this.height * percent;
                this.ctx.lineTo(x, y)
            }
            this.ctx.stroke();

        }
    }

    setColor(color: string) {
        this.strokeColor = color;
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    startAnimation() {
        if (!this.requestId)
            this.requestId = requestAnimationFrame(this.updateAnimation.bind(this));
    }

    stopAnimation() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
            this.ctx?.clearRect(0, 0, this.width, this.height);
        }
    }

    updateAnimation() {
        this.synth.analyserNode.getByteTimeDomainData(this.synth.data);
        this.drawWaveform(this.synth.data);
        this.requestId = undefined;
        this.startAnimation();
    }
}
