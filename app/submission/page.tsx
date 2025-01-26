"use client"

import { useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { CompanyLogo } from "@/components/company-logo"
import { FileDown } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

export default function SubmissionPage() {
  const searchParams = useSearchParams()
  const data = JSON.parse(decodeURIComponent(searchParams.get("data") || "{}"), (key, value) => {
    if (key === "requestDate" || key === "returnDate" || key === "dob" || key === "startDate" || key === "endDate") {
      return new Date(value)
    }
    return value
  })

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, "PPP") : "N/A"
  }

  const generatePDF = async () => {
    const content = document.getElementById("pdf-content")
    if (content) {
      const canvas = await html2canvas(content)
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save("background_check_report.pdf")
    }
  }

  return (
    <div className="min-h-screen bg-[#001f3f] py-8">
      <div id="pdf-content" className="container mx-auto p-4 space-y-8 bg-white shadow-lg rounded-lg">
        <CompanyLogo />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#001f3f] mb-2">PERSONAL IDENTIFICATION RECORDS SEARCH</h1>
          <p className="font-bold text-red-600">**CONFIDENTIAL**</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-[#001f3f]">
          <div>
            <p>
              <strong>Client:</strong> {data.personalInfo.client}
            </p>
            <p>
              <strong>Request Date:</strong> {formatDate(data.personalInfo.requestDate)}
            </p>
            <p>
              <strong>Return Date:</strong> {formatDate(data.personalInfo.returnDate)}
            </p>
            <p>
              <strong>Address:</strong> {data.personalInfo.address}
            </p>
            <p>
              <strong>Reference:</strong> {data.personalInfo.reference}
            </p>
          </div>
          <div>
            <p>
              <strong>Basic Search Records Initiated on</strong>
            </p>
            <p>
              <strong>Candidate:</strong> {data.personalInfo.candidate}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formatDate(data.personalInfo.dob)}
            </p>
            <p>
              <strong>Identification Presented:</strong> {data.personalInfo.idType}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-[#001f3f]">
          <div>
            <h2 className="text-xl font-semibold mb-2">Identity Verification</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#e6f3ff]">
                  <TableHead className="font-semibold">Identification Type</TableHead>
                  <TableHead className="font-semibold">Verification Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{data.personalInfo.idType}</TableCell>
                  <TableCell>Sample text</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Candidate's Records</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#e6f3ff]">
                  <TableHead className="font-semibold">Address History</TableHead>
                  <TableHead className="font-semibold">Verification Status</TableHead>
                  <TableHead className="font-semibold">Phone History</TableHead>
                  <TableHead className="font-semibold">Verification Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.candidateRecords.map((record: any, index: number) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-[#f0f8ff]" : ""}>
                    <TableCell>{record.address}</TableCell>
                    <TableCell>Sample text</TableCell>
                    <TableCell>{record.phone}</TableCell>
                    <TableCell>Sample text</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Education History</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#e6f3ff]">
                  <TableHead className="font-semibold">Institution</TableHead>
                  <TableHead className="font-semibold">Program/Degree</TableHead>
                  <TableHead className="font-semibold">Dates Attended</TableHead>
                  <TableHead className="font-semibold">Verification Status</TableHead>
                  <TableHead className="font-semibold">Contact Person</TableHead>
                  <TableHead className="font-semibold">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.educationEntries.map((entry: any, index: number) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-[#f0f8ff]" : ""}>
                    <TableCell>{entry.institution}</TableCell>
                    <TableCell>{entry.program}</TableCell>
                    <TableCell>{`${formatDate(entry.startDate)} - ${formatDate(entry.endDate)}`}</TableCell>
                    <TableCell>{entry.status}</TableCell>
                    <TableCell>Sample contact</TableCell>
                    <TableCell>Sample remarks</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Candidate's Reference Check</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#e6f3ff]">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Contact Number</TableHead>
                  <TableHead className="font-semibold">Organization</TableHead>
                  <TableHead className="font-semibold">Verification Status</TableHead>
                  <TableHead className="font-semibold">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.referenceEntries.map((entry: any, index: number) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-[#f0f8ff]" : ""}>
                    <TableCell>{entry.name}</TableCell>
                    <TableCell>{entry.contact}</TableCell>
                    <TableCell>{entry.organization}</TableCell>
                    <TableCell>Sample status</TableCell>
                    <TableCell>{entry.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Candidate's Employment History Check</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#e6f3ff]">
                  <TableHead className="font-semibold">Organization Name</TableHead>
                  <TableHead className="font-semibold">Dates Employed</TableHead>
                  <TableHead className="font-semibold">Responsibilities</TableHead>
                  <TableHead className="font-semibold">Verification Status</TableHead>
                  <TableHead className="font-semibold">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.employmentEntries.map((entry: any, index: number) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-[#f0f8ff]" : ""}>
                    <TableCell>{entry.orgName}</TableCell>
                    <TableCell>{`${formatDate(entry.startDate)} - ${formatDate(entry.endDate)}`}</TableCell>
                    <TableCell>{entry.responsibilities}</TableCell>
                    <TableCell>{entry.status}</TableCell>
                    <TableCell>{entry.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">CRIMINAL RECORDS CHECK</h2>
            <p className="font-bold text-red-600">**CONFIDENTIAL**</p>
            <p>Criminal records check information would be displayed here.</p>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">CREDIT RECORDS CHECK</h2>
            <p className="font-bold text-red-600">**CONFIDENTIAL**</p>
            <p>Credit records check information would be displayed here.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Additional Remarks</h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#e6f3ff]">
                  <TableHead className="font-semibold">Check Type</TableHead>
                  <TableHead className="font-semibold">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.additionalChecks.map((check: any, index: number) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-[#f0f8ff]" : ""}>
                    <TableCell>{check.checkType}</TableCell>
                    <TableCell>{check.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Verification Officers</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Verified By:</strong> {data.verificationOfficers.verifiedBy}
                </p>
                {data.verificationOfficers.verifiedBySignature && (
                  <div>
                    <p>
                      <strong>Signature:</strong>
                    </p>
                    <img
                      src={data.verificationOfficers.verifiedBySignature || "/placeholder.svg"}
                      alt="Verified By Signature"
                      className="max-w-full h-auto border border-gray-300"
                    />
                  </div>
                )}
              </div>
              <div>
                <p>
                  <strong>Identity Screening Officer:</strong> {data.verificationOfficers.screeningOfficer}
                </p>
                {data.verificationOfficers.screeningOfficerSignature && (
                  <div>
                    <p>
                      <strong>Signature:</strong>
                    </p>
                    <img
                      src={data.verificationOfficers.screeningOfficerSignature || "/placeholder.svg"}
                      alt="Identity Screening Officer Signature"
                      className="max-w-full h-auto border border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Disclaimer</h2>
            <p className="text-sm">
              Morrison Records Bureau conducts background checks based on the information provided by the candidate.
              While every effort is made to ensure accuracy, we cannot guarantee completeness or accuracy due to
              reliance on external data sources and the information provided. Our reports should be used as a
              supplementary tool for decision-making purposes only.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Button
          onClick={generatePDF}
          className="bg-[#00a8ff] hover:bg-[#0056b3] text-white font-bold py-2 px-4 rounded"
        >
          <FileDown className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  )
}

