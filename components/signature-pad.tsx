"use client"

import React, { useRef } from "react"
import SignatureCanvas from "react-signature-canvas"
import { Button } from "@/components/ui/button"

interface SignaturePadProps {
  onSave: (signature: string) => void
}

export function SignaturePad({ onSave }: SignaturePadProps) {
  const signatureRef = useRef<SignatureCanvas>(null)

  const handleSave = () => {
    if (signatureRef.current) {
      const dataURL = signatureRef.current.toDataURL()
      onSave(dataURL)
    }
  }

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear()
    }
  }

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{
          className: "signature-canvas",
          width: 300,
          height: 150,
        }}
      />
      <div className="mt-2 flex justify-between">
        <Button type="button" onClick={handleClear} variant="outline">
          Clear
        </Button>
        <Button type="button" onClick={handleSave}>
          Save Signature
        </Button>
      </div>
    </div>
  )
}

