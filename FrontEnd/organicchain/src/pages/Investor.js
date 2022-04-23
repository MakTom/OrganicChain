import React, { useState}  from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Investor() {
    const [area, setarea] = useState();
    const [crop, setcrop] = useState();
    const [tokenPercent, settokenPercent] = useState();

  return (
    <div className="container">
        <div className="action">
            <input type="radio" value="submit" name="Add Farm" /> Add Farm
        </div>
        <form className="input-form">
            <div className="input-container">
                <label className="label">Area </label>
                <input className="input-box"  type="text" value = {area} required onChange={(e) => setarea(e.target.value)}/>
            </div>
            <div className="input-container">
                <label className="label">Crop </label>
                <input className="input-box"  type="text" value = {crop} required onChange={(e) => setcrop(e.target.value)}/>
            </div>
            <div className="input-container">
                <label className="label1">Token Percent </label>
                <input className="input-box"  type="text" value = {tokenPercent} required onChange={(e) => settokenPercent(e.target.value)}/>
            </div>
            <div className="input-button">
                <input className="Submit" type="button" value="Clear" />
                <input className="Submit" type="submit" value="Submit" />
            </div>
        </form>
    </div>

  )
}