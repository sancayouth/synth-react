import React from 'react';

interface IProps {
    label: string,
    id: string,
    name: string,
    min: number,
    max: number,
    value: number,
    step: string,
    onChangeInput: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = (props: IProps) => {
    return (
        <div className="form-container">
            <label>{props.label}</label>
            <input type="range" id={props.id} name={props.name} min={props.min} max={props.max} step={parseFloat(props.step)} value={props.value} onChange={props.onChangeInput} />
        </div>
    );
}
