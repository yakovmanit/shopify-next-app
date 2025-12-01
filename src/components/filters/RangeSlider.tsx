'use client';

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  step: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
};

const RangeSlider = React.forwardRef(
  (
    { className, min, max, step, formatLabel, value, onValueChange, ...props }: SliderProps,
    ref,
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max];
    const [localValues, setLocalValues] = React.useState(initialValue);

    React.useEffect(() => {
      // Update localValues when the external value prop changes
      setLocalValues(Array.isArray(value) ? value : [min, max]);
    }, [min, max, value]);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        className='relative flex w-full touch-none select-none mb-6 items-center'
        {...props}>
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-blue-100">
          <SliderPrimitive.Range className="absolute h-full bg-blue-400" />
        </SliderPrimitive.Track>
        {localValues.map((value, index) => (
          <React.Fragment key={index}>
            <div
              className="absolute text-center"
              style={{
                left: `calc(${((value - min) / (max - min)) * 85}% + 0px)`,
                top: `10px`,
              }}>
              <span className="text-sm text-gray-700">{formatLabel ? formatLabel(value) : value}</span>
            </div>
            <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-blue-300 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 disabled:pointer-events-none disabled:opacity-50" />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  },
);

RangeSlider.displayName = SliderPrimitive.Root.displayName;

export { RangeSlider };