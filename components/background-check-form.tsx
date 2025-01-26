"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2 } from "lucide-react"
import { DatePicker } from "@/components/date-picker"
import { SignaturePad } from "@/components/signature-pad"

export function BackgroundCheckForm() {
  const router = useRouter()
  const [personalInfo, setPersonalInfo] = useState({
    client: "",
    requestDate: undefined as Date | undefined,
    returnDate: undefined as Date | undefined,
    address: "",
    reference: "",
    candidate: "",
    dob: undefined as Date | undefined,
    idType: "",
  })
  const [candidateRecords, setCandidateRecords] = useState([{ address: "", phone: "" }])
  const [educationEntries, setEducationEntries] = useState([
    {
      institution: "",
      program: "",
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      status: "",
    },
  ])
  const [referenceEntries, setReferenceEntries] = useState([{ name: "", contact: "", organization: "", remarks: "" }])
  const [employmentEntries, setEmploymentEntries] = useState([
    {
      orgName: "",
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      responsibilities: "",
      status: "",
      remarks: "",
    },
  ])
  const [additionalChecks, setAdditionalChecks] = useState([{ checkType: "", details: "" }])
  const [verificationOfficers, setVerificationOfficers] = useState({
    verifiedBy: "",
    verifiedBySignature: "",
    screeningOfficer: "",
    screeningOfficerSignature: "",
  })

  const addEntry = (setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    setter((prev) => [...prev, {}])
  }

  const removeEntry = (setter: React.Dispatch<React.SetStateAction<any[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  const updateEntry = (setter: React.Dispatch<React.SetStateAction<any[]>>, index: number, key: string, value: any) => {
    setter((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = {
      personalInfo,
      candidateRecords,
      educationEntries,
      referenceEntries,
      employmentEntries,
      additionalChecks,
      verificationOfficers,
    }
    router.push(`/submission?data=${encodeURIComponent(JSON.stringify(formData))}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Identification Records Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client">Client</Label>
              <Input
                id="client"
                value={personalInfo.client}
                onChange={(e) => setPersonalInfo({ ...personalInfo, client: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="requestDate">Request Date</Label>
              <DatePicker
                date={personalInfo.requestDate}
                setDate={(date) => setPersonalInfo({ ...personalInfo, requestDate: date })}
              />
            </div>
            <div>
              <Label htmlFor="returnDate">Return Date</Label>
              <DatePicker
                date={personalInfo.returnDate}
                setDate={(date) => setPersonalInfo({ ...personalInfo, returnDate: date })}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={personalInfo.reference}
                onChange={(e) => setPersonalInfo({ ...personalInfo, reference: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="candidate">Candidate</Label>
              <Input
                id="candidate"
                value={personalInfo.candidate}
                onChange={(e) => setPersonalInfo({ ...personalInfo, candidate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <DatePicker date={personalInfo.dob} setDate={(date) => setPersonalInfo({ ...personalInfo, dob: date })} />
            </div>
            <div>
              <Label htmlFor="idType">Identification Type</Label>
              <Select onValueChange={(value) => setPersonalInfo({ ...personalInfo, idType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="driverLicense">Driver's License</SelectItem>
                  <SelectItem value="nationalId">National ID</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Candidate's Records
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="w-full sm:w-auto"
              onClick={() => addEntry(setCandidateRecords)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Address History</TableHead>
                  <TableHead>Phone History</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidateRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={record.address}
                        onChange={(e) => updateEntry(setCandidateRecords, index, "address", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={record.phone}
                        onChange={(e) => updateEntry(setCandidateRecords, index, "phone", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="w-full sm:w-auto"
                        onClick={() => removeEntry(setCandidateRecords, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Education History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Education History
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="w-full sm:w-auto"
              onClick={() => addEntry(setEducationEntries)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Institution</TableHead>
                  <TableHead>Program/Degree</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Verification Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {educationEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={entry.institution}
                        onChange={(e) => updateEntry(setEducationEntries, index, "institution", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.program}
                        onChange={(e) => updateEntry(setEducationEntries, index, "program", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <DatePicker
                        date={entry.startDate}
                        setDate={(date) => updateEntry(setEducationEntries, index, "startDate", date)}
                      />
                    </TableCell>
                    <TableCell>
                      <DatePicker
                        date={entry.endDate}
                        setDate={(date) => updateEntry(setEducationEntries, index, "endDate", date)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.status}
                        onChange={(e) => updateEntry(setEducationEntries, index, "status", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="w-full sm:w-auto"
                        onClick={() => removeEntry(setEducationEntries, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Candidate's Reference Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Candidate's Reference Check
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="w-full sm:w-auto"
              onClick={() => addEntry(setReferenceEntries)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Number</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referenceEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={entry.name}
                        onChange={(e) => updateEntry(setReferenceEntries, index, "name", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.contact}
                        onChange={(e) => updateEntry(setReferenceEntries, index, "contact", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.organization}
                        onChange={(e) => updateEntry(setReferenceEntries, index, "organization", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.remarks}
                        onChange={(e) => updateEntry(setReferenceEntries, index, "remarks", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="w-full sm:w-auto"
                        onClick={() => removeEntry(setReferenceEntries, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Employment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Candidate's Employment History Check
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="w-full sm:w-auto"
              onClick={() => addEntry(setEmploymentEntries)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Organization Name</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Responsibilities</TableHead>
                  <TableHead>Verification Status</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employmentEntries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={entry.orgName}
                        onChange={(e) => updateEntry(setEmploymentEntries, index, "orgName", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <DatePicker
                        date={entry.startDate}
                        setDate={(date) => updateEntry(setEmploymentEntries, index, "startDate", date)}
                      />
                    </TableCell>
                    <TableCell>
                      <DatePicker
                        date={entry.endDate}
                        setDate={(date) => updateEntry(setEmploymentEntries, index, "endDate", date)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.responsibilities}
                        onChange={(e) => updateEntry(setEmploymentEntries, index, "responsibilities", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.status}
                        onChange={(e) => updateEntry(setEmploymentEntries, index, "status", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.remarks}
                        onChange={(e) => updateEntry(setEmploymentEntries, index, "remarks", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="w-full sm:w-auto"
                        onClick={() => removeEntry(setEmploymentEntries, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Additional Checks
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="w-full sm:w-auto"
              onClick={() => addEntry(setAdditionalChecks)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Check Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additionalChecks.map((check, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={check.checkType}
                        onChange={(e) => updateEntry(setAdditionalChecks, index, "checkType", e.target.value)}
                        placeholder="e.g., Criminal, Credit"
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={check.details}
                        onChange={(e) => updateEntry(setAdditionalChecks, index, "details", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="w-full sm:w-auto"
                        onClick={() => removeEntry(setAdditionalChecks, index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Verification Officers */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Officers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="verifiedBy">Verified By</Label>
            <Input
              id="verifiedBy"
              value={verificationOfficers.verifiedBy}
              onChange={(e) => setVerificationOfficers({ ...verificationOfficers, verifiedBy: e.target.value })}
            />
          </div>
          <div>
            <Label>Verified By Signature</Label>
            <SignaturePad
              onSave={(signature) =>
                setVerificationOfficers({ ...verificationOfficers, verifiedBySignature: signature })
              }
            />
          </div>
          <div>
            <Label htmlFor="screeningOfficer">Identity Screening Officer</Label>
            <Input
              id="screeningOfficer"
              value={verificationOfficers.screeningOfficer}
              onChange={(e) => setVerificationOfficers({ ...verificationOfficers, screeningOfficer: e.target.value })}
            />
          </div>
          <div>
            <Label>Identity Screening Officer Signature</Label>
            <SignaturePad
              onSave={(signature) =>
                setVerificationOfficers({ ...verificationOfficers, screeningOfficerSignature: signature })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full sm:w-auto">
        Submit Background Check
      </Button>
    </form>
  )
}

