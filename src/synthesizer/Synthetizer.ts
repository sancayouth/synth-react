import { ISynthParams, IPropsEnvelope } from '../types';
import { WaveFormVisualizer } from './waveFormVisualizer';

interface IOscValue {
    type: OscillatorType,
    frequency: number
}

export default class Synthetizer {
    audioCtx: AudioContext
    tremolo: GainNode;
    tremoloFrequency: number;
    shaper: WaveShaperNode;
    lfo: OscillatorNode;
    envelope: GainNode;
    analyserNode: AnalyserNode;
    bufferLength: number;
    volume: number;
    data: Uint8Array;
    envelopeParams: IPropsEnvelope;
    visualizer!: WaveFormVisualizer;
    osciladores: OscillatorNode[];
    patchParams: IOscValue[];
    FFT_SIZE: number = 2048;

    constructor(audioContext: AudioContext) {
        this.osciladores = [];
        this.patchParams = [];
        this.volume = 0.2;
        this.envelopeParams = { attack: 0.1, decay: 0.1, sustain: 0.1, release: 1 };
        this.tremoloFrequency = 5;
        this.audioCtx = audioContext;

        this.analyserNode = new AnalyserNode(this.audioCtx, { fftSize: this.FFT_SIZE });
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

    play(keyId: number): Synthetizer {
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

        this.osciladores = this.patchParams.map(opt => {
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
        this.osciladores.forEach((osc: OscillatorNode) => osc.stop(release + 1));
        this.visualizer.stopAnimation();
    }

    setCanvas(canvas: HTMLCanvasElement): Synthetizer {
        this.visualizer = new WaveFormVisualizer(canvas, this, this.FFT_SIZE);
        return this;
    }

    setThemeColor(color: string): Synthetizer {
        if (this.visualizer)
            this.visualizer.setColor(color);
        return this;
    }

    setOscValues(values: IOscValue[]): Synthetizer {
        this.patchParams = values;
        return this;
    }

    setVolume(volume: number): Synthetizer {
        this.volume = volume;
        return this;
    }

    setEnvelope(values: IPropsEnvelope): Synthetizer {
        this.envelopeParams = values;
        return this;
    }

    setTremolo(value: number): Synthetizer {
        this.tremoloFrequency = value;
        return this;
    }

    setAllValues(syntParams: ISynthParams): Synthetizer {
        this.setOscValues([
            {
                type: syntParams.osc1WaveForm as OscillatorType,
                frequency: this._valueToFloat(syntParams.freqOsc1)
            },
            {
                type: syntParams.osc2WaveForm as OscillatorType,
                frequency: this._valueToFloat(syntParams.freqOsc2)
            }])
        this.setEnvelope({ attack: this._valueToFloat(syntParams.attack), decay: this._valueToFloat(syntParams.decay), sustain: this._valueToFloat(syntParams.sustain), release: this._valueToFloat(syntParams.release) });
        this.setVolume(syntParams.volume);
        this.setTremolo(syntParams.freqTremolo);
        return this;
    }

    _valueToFloat(value: any): number { return parseFloat(value.toString()) }
}


