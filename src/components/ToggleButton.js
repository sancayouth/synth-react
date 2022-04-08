const ToggleButton = (props) => {
    function toogleToDarkTheme() {
        props.toggleToDarkTheme();
    }
    return (
        <div className='ToggleButton'>
            <input type="checkbox" className="checkbox" onClick={toogleToDarkTheme} />
            <label className="label" label="chk">
                <div className="ball"></div>
            </label>
        </div>)
}

export default ToggleButton;
