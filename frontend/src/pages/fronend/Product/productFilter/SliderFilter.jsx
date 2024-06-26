import React, { useState } from 'react';
import './Slider.css'; // Custom CSS for styling the slider

const SliderFilter = ({ min, max, step, values, onChange }) => {
    const [minValue, setMinValue] = useState(values[0]);
    const [maxValue, setMaxValue] = useState(values[1]);

    // Handle changes in minValue input
    const handleMinChange = (event) => {
        let value = parseInt(event.target.value);
        value = isNaN(value) ? min : value;
        value = Math.min(Math.max(min, value), maxValue - 1);
        setMinValue(value);
        onChange([value, maxValue]);
    };

    // Handle changes in maxValue input
    const handleMaxChange = (event) => {
        let value = parseInt(event.target.value);
        value = isNaN(value) ? max : value;
        value = Math.max(Math.min(max, value), minValue + 1);
        setMaxValue(value);
        onChange([minValue, value]);
    };

    // Format values for display
    const formatValue = (value) => {
        return value !== undefined ? value.toLocaleString() + ' vnđ' : '';
    };

    return (
        <div className="slider-container">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={minValue || min} // Handle case when minValue is undefined
                onChange={handleMinChange}
                className="slider"
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={maxValue || max} // Handle case when maxValue is undefined
                onChange={handleMaxChange}
                className="slider"
            />
            <div className="slider-values">
                <span>{formatValue(minValue)}</span> - <span>{formatValue(maxValue)}</span>
            </div>
        </div>
    );
};

export default SliderFilter;
