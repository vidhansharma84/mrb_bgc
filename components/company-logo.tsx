import Image from "next/image"

export function CompanyLogo() {
  return (
    <div className="flex items-center justify-center mb-8">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AN-LOGO-R2-1536x599-1-wxrEghMGDP2xTJ92CXAqfiyb6IvK4V.png"
        alt="MRB Logo"
        width={300}
        height={117}
        priority
        className="dark:filter dark:brightness-110"
      />
    </div>
  )
}

