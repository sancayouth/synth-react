import React from 'react';
import FormInput from './FormInput';
import FormWaveSelect from './FormWaveSelect';
import Visualizer from './Visualizer';

const SyntHeader = (props) => {
    const [frequencyLabelOsc1, setFrequencyLabelOsc1] = React.useState(`Freq. ${props.synthParams.freqOsc1}Hz`);
    const [frequencyLabelOsc2, setFrequencyLabelOsc2] = React.useState(`Freq. ${props.synthParams.freqOsc2}Hz`);
    const [frequencyTremolo, setFrequencyTremolo] = React.useState(`Freq. ${props.synthParams.freqTremolo}Hz`);

    function changeValue(ev) {
        props.changeParams({ [ev.target.name]: ev.target.value });
        if (ev.target.name === 'freqOsc1')
            setFrequencyLabelOsc1(`Freq. ${ev.target.value}Hz`);
        else if (ev.target.name === 'freqOsc2')
            setFrequencyLabelOsc2(`Freq. ${ev.target.value}Hz`);
        else if (ev.target.name === 'freqTremolo')
            setFrequencyTremolo(`Freq. ${ev.target.value}Hz`);
    }

    return (
        <section id="synth_header">
            <div id="osciladores">
                <fieldset>
                    <legend>Volume</legend>
                    <FormInput label={"Volume"} id={"volume"} name={"volume"} min={"0"} max={"1"} value={props.synthParams.volume} onChangeInput={changeValue} />
                </fieldset>
                <fieldset>
                    <legend>Osc 1</legend>
                    <FormWaveSelect id={"osc1_waveforms"} value={props.synthParams.osc1WaveForm} name={"osc1WaveForm"} onChangeSelect={changeValue} />
                    <FormInput label={frequencyLabelOsc1} id={"osc1_frequency"} name={"freqOsc1"} min={"220"} max={"880"} value={props.synthParams.freqOsc1} onChangeInput={changeValue} />
                </fieldset>
                <fieldset>
                    <legend>Osc 2</legend>
                    <FormWaveSelect id={"osc2_waveforms"} value={props.synthParams.osc2WaveForm} name={"osc2WaveForm"} onChangeSelect={changeValue} />
                    <FormInput label={frequencyLabelOsc2} id={"osc2_frequency"} name={"freqOsc2"} min={"220"} max={"880"} value={props.synthParams.freqOsc2} onChangeInput={changeValue} />
                </fieldset>
                <fieldset>
                    <legend>Tremolo</legend>
                    <FormInput label={frequencyTremolo} id={"tremolo_frequency"} name={"freqTremolo"} min={"0"} max={"11"} value={props.synthParams.freqTremolo} onChangeInput={changeValue} />
                </fieldset>
                <fieldset id="envelope">
                    <legend>Envelope</legend>
                    <FormInput label={"Attack"} id={"attack"} name={"attack"} min={"0"} max={"1"} value={props.synthParams.attack} onChangeInput={changeValue} />
                    <FormInput label={"Decay"} id={"decay"} name={"decay"} min={"0"} max={"1"} value={props.synthParams.decay} onChangeInput={changeValue} />
                    <FormInput label={"Sustain"} id={"sustain"} name={"sustain"} min={"0"} max={"1"} value={props.synthParams.sustain} onChangeInput={changeValue} />
                    <FormInput label={"Release"} id={"release"} name={"release"} min={"0"} max={"1"} value={props.synthParams.release} onChangeInput={changeValue} />
                </fieldset>
            </div>
            <Visualizer canvasRef={props.canvasRef} />
        </section>
    );
}

export default SyntHeader;
