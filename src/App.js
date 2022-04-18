import { useState, useRef, useEffect } from 'react';
import SyntHeader from './components/SyntHeader';
import Keys from './components/Keys';
import ToggleButton from './components/ToggleButton';
import Synthetizer from './synthesizer/synth';
import themes from './ThemeStyles'
import './styles/App.min.css';

const audioCtx = new AudioContext()
const synth = new Synthetizer(audioCtx);

const App = () => {
  const [syntParams, setSynthParams] = useState({
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
  });

  const [darkTheme, setDarkTheme] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    synth.setCanvas(canvasRef.current);
  }, []);

  const onPlayNote = note => {
    const key = note;
    synth
      .setEnvelope({ attack: parseFloat(syntParams.attack), decay: parseFloat(syntParams.decay), sustain: parseFloat(syntParams.sustain), release: parseFloat(syntParams.release) })
      .setVolume(parseFloat(syntParams.volume))
      .setTremolo(parseFloat(syntParams.freqTremolo))
      .setOscValues([
        {
          type: syntParams.osc1WaveForm,
          frequency: parseFloat(syntParams.freqOsc1)
        },
        {
          type: syntParams.osc2WaveForm,
          frequency: parseFloat(syntParams.freqOsc2)
        }])
      .play(key);
  }

  const stop = () => synth.stop();

  const onChangeParams = (params) => {
    const key = Object.keys(params)[0];
    setSynthParams(prevParams => {
      return {
        ...prevParams,
        [key]: params[key]
      }
    });
  }

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
    <div id="app" className={(darkTheme) ? "darkTheme" : ""}>
      <ToggleButton toggleToDarkTheme={toggleToDarkTheme} />
      <SyntHeader synthParams={syntParams} changeParams={onChangeParams} canvasRef={canvasRef} />
      <Keys playNote={onPlayNote} stopNote={stop} />
    </div>
  );
}

export default App;
