import { useState, useRef, useEffect, useCallback } from 'react';
import { SyntHeader } from './components/SyntHeader';
import { Keys } from './components/Keys';
import { ToggleButton } from './components/ToggleButton';
import Synthetizer from './synthesizer/Synthetizer';
import { themes } from './ThemeStyles';
import './styles/App.scss';
import { ISynthParams } from './types';

const audioCtx = new AudioContext()
const synth = new Synthetizer(audioCtx);

export const App = () => {
    const [syntParams, setSynthParams] = useState<ISynthParams>({
        volume: 0.2,
        freqOsc1: 220.00,
        osc1WaveForm: 'sine',
        freqOsc2: 220.00,
        osc2WaveForm: 'square',
        freqTremolo: 0,
        attack: 0,
        decay: 0,
        sustain: 0,
        release: 0,
    } as ISynthParams);

    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef?.current)
            synth.setCanvas(canvasRef?.current).setAllValues(syntParams)
    }, [syntParams]);

    const onPlayNote = useCallback((note: number) => synth.play(note), []);
    const stop = useCallback(() => synth.stop(), []);

    const onChangeParams = (params: Record<string, any>) => {
        const key: string = Object.keys(params)[0];
        setSynthParams((prevParams: ISynthParams) => {
            return {
                ...prevParams,
                [key]: params[key]
            }
        });
        synth.setAllValues(syntParams);
    };

    const toggleToDarkTheme = () => {
        setDarkTheme(prevState => {
            let actualTheme = ((prevState) ? themes.baseTheme : themes.darkTheme);
            for (const key of Object.keys(actualTheme))
                document.documentElement.style.setProperty(key, actualTheme[key]);

            synth.setThemeColor((prevState) ? "#8fa3ff" : "#a5ff8f");
            return !prevState
        });
    }

    return (
        <div className='app'>
            <ToggleButton onClick={toggleToDarkTheme} />
            <SyntHeader synthParams={syntParams} changeParams={onChangeParams} canvasRef={canvasRef} />
            <Keys onEnter={onPlayNote} onLeave={stop} />
        </div>
    );
}
