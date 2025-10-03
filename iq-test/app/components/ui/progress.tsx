// components/ui/progress.tsx
import React from "react"

type ProgressProps = {
  value: number
  className?: string
  ariaLabel?: string
}

export function Progress({ value, className = "", ariaLabel = "Progress" }: ProgressProps) {
  const safeValue = Math.max(0, Math.min(100, Number(value || 0)))

  return (
    <div
      className={`w-full bg-slate-700/30 rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
      aria-label={ariaLabel}
    >
      <div
        style={{ width: `${safeValue}%` }}
        className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-[width] duration-300"
      />
    </div>
  )
}

export default Progress
