import React from 'react';

export const ToggleButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className="toggle_button">
            <input type="checkbox" className="checkbox" onClick={(ev: React.MouseEvent<HTMLInputElement>) => { onClick() }} />
            <label className="label">
                <div className="ball"></div>
            </label>
        </div>);
};
