import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { FormWaveSelect } from './FormWaveSelect';
import { Visualizer } from './Visualizer';

interface IProps {
    synthParams: Record<string, any>,
    canvasRef: React.MutableRefObject<any>,
    changeParams: (value: Record<string, any>) => void
}

export const SyntHeader = (props: IProps) => {
    const [frequencyLabelOsc1, setFrequencyLabelOsc1] = useState<number>(props.synthParams.freqOsc1);
    const [frequencyLabelOsc2, setFrequencyLabelOsc2] = useState<number>(props.synthParams.freqOsc2);
    const [frequencyTremolo, setFrequencyTremolo] = useState<number>(props.synthParams.freqTremolo);

    const changeValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const target = ev.target as HTMLInputElement;
        props.changeParams({ [target.name]: target.value });
        const value = parseFloat(target.value.toString());

        switch (target.name) {
            case 'freqOsc1':
                setFrequencyLabelOsc1(value);
                break;
            case 'freqOsc2':
                setFrequencyLabelOsc2(value);
                break;
            case 'freqTremolo':
                setFrequencyTremolo(value);
                break;
            default:
                break
        }
    }

    return (
        <section id="synth_header">
            <div id="oscillators">
                <fieldset>
                    <legend>Volume</legend>
                    <FormInput label="Volume" id="volume" name="volume" min={0} max={.45} value={props.synthParams.volume} onChangeInput={changeValue} step="0.02" />
                </fieldset>
                {
                    [1, 2].map((id: number) => (
                        <fieldset key={id}>
                            <legend>Osc {id}</legend>
                            <FormWaveSelect id={`osc${id}_waveforms`} value={props.synthParams[`osc${id}WaveForm`]} name={`osc${id}WaveForm`} onChangeSelect={changeValue} />
                            <FormInput label={`Freq. ${(id == 1) ? frequencyLabelOsc1 : frequencyLabelOsc2}Hz`} id={`osc${id}_frequency`} name={`freqOsc${id}`} min={220} max={880} value={props.synthParams[`freqOsc${id}`]} onChangeInput={changeValue} step="0.1" />
                        </fieldset>
                    ))
                }
                <fieldset>
                    <legend>Tremolo</legend>
                    <FormInput label={`Freq. ${frequencyTremolo}Hz`} id="tremolo_frequency" name="freqTremolo" min={0} max={11} value={props.synthParams.freqTremolo} onChangeInput={changeValue} step="0.1" />
                </fieldset>
                <fieldset id="envelope">
                    <legend>Envelope</legend>
                    {
                        ['attack', 'decay', 'sustain', 'release'].map((el: string, i: number) => (
                            <FormInput key={i} label={el.replace(/^./, str => str.toUpperCase())} id={el} name={el} min={0} max={1} value={props.synthParams[el]} onChangeInput={changeValue} step="0.1" />
                        ))
                    }
                </fieldset>
            </div>
            <Visualizer canvasRef={props.canvasRef} />
        </section>
    );
};
