interface CircularProgressProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  children?: React.ReactNode
}

export const CircularProgress = ({ 
  progress, 
  size = 280, 
  strokeWidth = 12,
  children 
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="circular-progress" style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        className="circular-progress-svg"
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: 'block' }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#d1d5db"
          strokeWidth={strokeWidth}
          fill="none"
          className="circular-progress-bg"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#16a34a"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="circular-progress-bar"
          style={{
            transform: `rotate(-90deg)`,
            transformOrigin: '50% 50%'
          }}
        />
      </svg>
      {/* Content in center */}
      <div className="circular-progress-content">
        {children}
      </div>
    </div>
  )
}