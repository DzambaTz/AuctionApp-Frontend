import "./index.scss";
import { useState, useRef, useEffect } from "react";
import classnames from "classnames";

const MultiRangeSlider = ({ min, max, onRelease, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  const [isDragged, setIsDragged] = useState(false);

  const thumbPositionToSliderWidthPercentage = (value) => {
    return Math.round(((value - min) / (max - min)) * 100);
  };

  const onRightThumbChange = (e) => {
    setIsDragged(true);
    const value = Math.max(Number(e.target.value), minVal);
    e.target.value = value;
    setMaxVal(value);
  };

  const onLeftThumbChange = (e) => {
    setIsDragged(true);
    const value = Math.min(Number(e.target.value), maxVal);
    e.target.value = value;
    setMinVal(value);
  };

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = thumbPositionToSliderWidthPercentage(minVal);
      const maxPercent = thumbPositionToSliderWidthPercentage(
        maxValRef.current.value
      );

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = thumbPositionToSliderWidthPercentage(
        minValRef.current.value
      );
      const maxPercent = thumbPositionToSliderWidthPercentage(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  useEffect(() => {
    if (!isDragged) {
      onRelease({ min: minVal, max: maxVal });
    }
  }, [isDragged]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(e) => {
          onLeftThumbChange(e);
        }}
        onMouseUp={() => setIsDragged(false)}
        className={classnames("thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > max - 100,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(e) => {
          onRightThumbChange(e);
        }}
        onMouseUp={() => setIsDragged(false)}
        className="thumb thumb--zindex-4"
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
    </>
  );
};

export default MultiRangeSlider;
