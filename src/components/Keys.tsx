import React from 'react';

interface IProps {
    onEnter: (key: number) => void,
    onLeave: () => void
}

export const Keys = React.memo(({ onEnter, onLeave }: IProps) => {
    const onMouseEnter = (key: number) => onEnter(key);

    return (
        <div id="keys">
            <div id="keys_container">
                <div id="black_keys_container">
                    <div id="black_keys">
                        <span onMouseEnter={ev => onMouseEnter(73)} onMouseLeave={onLeave} className="black key"></span>
                        <span onMouseEnter={ev => onMouseEnter(75)} onMouseLeave={onLeave} className="black key"></span>
                        <span className="spacer"></span>
                        <span onMouseEnter={ev => onMouseEnter(78)} onMouseLeave={onLeave} className="black key"></span>
                        <span onMouseEnter={ev => onMouseEnter(80)} onMouseLeave={onLeave} className="black key"></span>
                        <span onMouseEnter={ev => onMouseEnter(82)} onMouseLeave={onLeave} className="black key"></span>
                        <span className="spacer"></span>
                        <span onMouseEnter={ev => onMouseEnter(85)} onMouseLeave={onLeave} className="black key"></span>
                        <span onMouseEnter={ev => onMouseEnter(87)} onMouseLeave={onLeave} className="black key"></span>
                        <span className="spacer"></span>
                        <span onMouseEnter={ev => onMouseEnter(90)} onMouseLeave={onLeave} className="black key"></span>
                        <span onMouseEnter={ev => onMouseEnter(92)} onMouseLeave={onLeave} className="black key"></span>
                        <span onMouseEnter={ev => onMouseEnter(94)} onMouseLeave={onLeave} className="black key"></span>
                    </div>
                </div>
                <div id="white-keys">
                    {
                        [72, 74, 76, 77, 79, 81, 83, 84, 86, 88, 89, 91, 92, 95].map((el: number, index: number) => <span key={index} onMouseEnter={ev => onMouseEnter(el)} onMouseLeave={onLeave} className="white key"></span>)
                    }
                </div>
            </div>
        </div >
    );
});
