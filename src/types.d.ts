import React from 'react';

export interface ISynthParams {
    volume: number,
    freqOsc1: number,
    osc1WaveForm: string,
    freqOsc2: number,
    osc2WaveForm: string,
    freqTremolo: number,
    attack: number,
    decay: number,
    sustain: number,
    release: number
}

export interface IPropsEnvelope {
    attack: number,
    decay: number,
    sustain: number,
    release: number,
}
