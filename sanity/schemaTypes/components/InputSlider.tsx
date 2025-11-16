import React, { useState, useEffect, useRef } from 'react';
import { NumberInputProps, set } from 'sanity';
import { Slider } from '@/app/components/shadcn/slider';

const InputSlider = (props: NumberInputProps) => {
  const { value, onChange } = props;

  const [localValue, setLocalValue] = useState(
    value !== undefined ? value : 75
  );
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: number[]) => {
    const numValue = newValue[0];
    setLocalValue(numValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange(set(numValue));
    }, 150); // 150ms debounce delay
  };

  return (
    <div className="flex items-center gap-2 pb-2">
      <Slider
        value={[localValue]}
        max={100}
        step={1}
        onValueChange={handleValueChange}
      />
      <span className="flex justify-center items-center w-[5ch] text-xs font-medium">
        {localValue}
      </span>
    </div>
  );
};

export default InputSlider;
