"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef(({ className, min = 0, max = 100, step = 1, value, onValueChange, defaultValue, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || [min])
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (e) => {
    const newValue = [Number(e.target.value)]
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)} ref={ref}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue[0]}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full appearance-none cursor-pointer slider-thumb"
        {...props}
      />
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #059669;
          cursor: pointer;
        }
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #059669;
          cursor: pointer;
        }
        .slider-thumb::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #059669 0%, #059669 ${((currentValue[0] - min) / (max - min)) * 100}%, #e5e7eb ${((currentValue[0] - min) / (max - min)) * 100}%, #e5e7eb 100%);
          height: 8px;
          border-radius: 4px;
        }
        .dark .slider-thumb::-webkit-slider-runnable-track {
          background: linear-gradient(to right, #059669 0%, #059669 ${((currentValue[0] - min) / (max - min)) * 100}%, #1f2937 ${((currentValue[0] - min) / (max - min)) * 100}%, #1f2937 100%);
        }
      `}</style>
    </div>
  )
})
Slider.displayName = "Slider"

export { Slider }
