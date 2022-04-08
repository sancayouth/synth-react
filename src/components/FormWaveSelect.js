
const FormWaveSelect = (props) => {
    return (
        <div className="form-container">
            <label>Waveforms</label>
            <select id={props.id} value={props.value} name={props.name} onChange={props.onChangeSelect} >
                <option value="sine">sine</option>
                <option value="triangle">triangle</option>
                <option value="square">square</option>
                <option value="sawtooth">sawtooth</option>
            </select>
        </div>
    );
};

export default FormWaveSelect;
