interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  };

  return (
    <div
      className={`relative inline-block ${sizeClasses[size]} ${className}`}
      role="status"
      {...props}
    >
      <div className="absolute w-full h-full rounded-full border-4 border-gray-200 opacity-30"></div>
      <div className="absolute w-full h-full rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}