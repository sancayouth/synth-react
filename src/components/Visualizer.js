const Visualizer = (props) => {
    return (
        <div id="display">
            <canvas ref={props.canvasRef} />
        </div>
    );
}

export default Visualizer
