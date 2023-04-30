import React from 'react';

export const Visualizer = ({ canvasRef }: { canvasRef: React.MutableRefObject<any> }) => {
    return (
        <div id="display">
            <canvas ref={canvasRef} />
        </div>
    );
};
