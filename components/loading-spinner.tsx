export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        {/* Spinning circle */}
        <div className="absolute inset-0 border-8 border-primary/20 rounded-full" />
        <div className="absolute inset-0 border-8 border-primary border-t-transparent rounded-full animate-spin" />

        {/* Center star */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl animate-pulse">⭐</div>
        </div>
      </div>
    </div>
  )
}
