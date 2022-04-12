import { WaveFormVisualizer } from "./waveFormVisualizer";
export default class Synthetizer {
    constructor(audioContext, canvas) {
        this.osciladores = [];
        this.patchParams = [];
        this.volume = 0.2;
        this.envelopeParams = { attack: 0.1, decay: 0.1, sustain: 0.1, release: 1 };
        this.tremoloFrequency = 5;
        this.audioCtx = audioContext;

        this.analyserNode = new AnalyserNode(this.audioCtx, { fftSize: 1024 });
        this.bufferLength = this.analyserNode.frequencyBinCount;
        this.data = new Uint8Array(this.bufferLength);
        this.envelope = this.audioCtx.createGain();

        this.tremolo = audioContext.createGain();
        this.tremolo.connect(audioContext.destination);
        this.tremolo.gain.value = 0;
        this.shaper = audioContext.createWaveShaper();
        this.shaper.curve = new Float32Array([0, 1]);
        this.shaper.connect(this.tremolo.gain);
        this.lfo = audioContext.createOscillator();
        this.lfo.type = 'sine';
        this.lfo.frequency.value = this.tremoloFrequency;
        this.lfo.start(this.audioCtx.currentTime);
        this.lfo.connect(this.shaper);
    }
    play(keyId) {
        this.envelope = this.audioCtx.createGain();
        this.envelope.connect(this.audioCtx.destination);
        this.envelope.gain.value = 0;
        const attackEnd = this.audioCtx.currentTime + this.envelopeParams.attack;
        const decayDuration = this.envelopeParams.decay + 2;

        this.envelope.gain.setValueAtTime(0, this.audioCtx.currentTime);
        this.envelope.gain.linearRampToValueAtTime(1, attackEnd);
        this.envelope.gain.setTargetAtTime(this.envelopeParams.sustain, attackEnd, decayDuration);
        let gain = this.audioCtx.createGain();
        gain.gain.value = this.volume;

        this.osciladores = this.patchParams.map((opt) => {
            let osc = this.audioCtx.createOscillator();
            osc.type = opt.type;
            osc.frequency.value = opt.frequency;
            osc.detune.value = ((keyId - 72) * 100);
            osc.start(this.audioCtx.currentTime);
            osc.connect(gain);
            return osc;
        });
        if (this.tremoloFrequency > 0) {
            this.lfo.frequency.value = this.tremoloFrequency;
            gain.connect(this.envelope).connect(this.tremolo).connect(this.analyserNode).connect(this.audioCtx.destination);
        }
        else
            gain.connect(this.envelope).connect(this.analyserNode).connect(this.audioCtx.destination);
        this.visualizer.startAnimation();
        return this;
    }
    stop() {
        const now = this.audioCtx.currentTime;
        const release = now + this.envelopeParams.release;
        this.envelope.gain.cancelScheduledValues(now);
        this.envelope.gain.setTargetAtTime(0.0, now, this.envelopeParams.release);
        this.osciladores.forEach((osc) => {
            osc.stop(release + 1);
        });
    }
    setCanvas(canvas) {
        this.visualizer = new WaveFormVisualizer(canvas, this);
    }
    setThemeColor(color) {
        if (this.visualizer)
            this.visualizer.setColor(color); 
    }
    setOscValues(values) {
        this.patchParams = values;
        return this;
    }
    setVolume(volume) {
        this.volume = volume;
        return this;
    }
    setEnvelope(values) {
        this.envelopeParams = values;
        return this;
    }
    setTremolo(value) {
        this.tremoloFrequency = value;
        return this;
    }
}
