import type React from "react"

interface ResponsiveWrapperProps {
  children: React.ReactNode
}

export function ResponsiveWrapper({ children }: ResponsiveWrapperProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 md:px-8">{children}</div>
    </div>
  )
}

