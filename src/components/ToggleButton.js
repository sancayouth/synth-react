const ToggleButton = props => {
    const toogleToDarkTheme = () => props.toggleToDarkTheme();

    return (
        <div className="toggle_button">
            <input type="checkbox" className="checkbox" onClick={toogleToDarkTheme} />
            <label className="label">
                <div className="ball"></div>
            </label>
        </div>)
}

export default ToggleButton;
