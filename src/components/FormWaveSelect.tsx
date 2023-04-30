interface IProps {
    id: string,
    value: string,
    name: string,
    onChangeSelect: (ev: any) => void
}

export const FormWaveSelect = (props: IProps) => {
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
