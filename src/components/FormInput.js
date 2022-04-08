
const FormInput = (props) => {
    return (
        <div className="form-container">
            <label>{props.label}</label>
            <input type="range" id={props.id} name={props.name} min={props.min} max={props.max} step="0.1" value={props.value} onChange={props.onChangeInput} />
        </div>
    );
}


export default FormInput;
