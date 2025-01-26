import { BackgroundCheckForm } from "@/components/background-check-form"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">Background Check Form</h1>
      <BackgroundCheckForm />
    </div>
  )
}

