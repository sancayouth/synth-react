import React from "react";

const Keys = React.memo(props => {
    return (
        <div id="keys">
            <div id="keys_container">
                <div id="black_keys">
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="73" className="black key"></span>
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="75" className="black key"></span>
                    <span className="spacer"></span>
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="78" className="black key"></span>
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="80" className="black key"></span>
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="82" className="black key"></span>
                    <span className="spacer"></span>
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="85" className="black key"></span>
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="87" className="black key"></span>
                    <span className="spacer"></span>
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="90" className="black key"></span>
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="92" className="black key"></span>
                    <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="94" className="black key"></span>
                </div>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="72" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="74" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="76" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="77" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="79" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="81" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="83" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="84" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="86" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="88" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="89" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="91" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="92" className="white key"></span>
                <span onMouseEnter={ev => props.enter(parseInt(ev.target.dataset.key))} onMouseLeave={props.leave} data-key="95" className="white key"></span>
            </div>
        </div>
    );
});

export default Keys;
