"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Trash2 } from "lucide-react"

export default function BackgroundCheckForm() {
  const [candidateRecords, setCandidateRecords] = useState([{ address: "", phone: "" }])
  const [educationEntries, setEducationEntries] = useState([{ institution: "", program: "", dates: "", status: "" }])
  const [referenceEntries, setReferenceEntries] = useState([{ name: "", contact: "", organization: "", remarks: "" }])
  const [employmentEntries, setEmploymentEntries] = useState([
    { orgName: "", dates: "", responsibilities: "", status: "", remarks: "" },
  ])
  const [additionalChecks, setAdditionalChecks] = useState([{ checkType: "", details: "" }])

  const addEntry = (setter: React.Dispatch<React.SetStateAction<any[]>>) => {
    setter((prev) => [...prev, {}])
  }

  const removeEntry = (setter: React.Dispatch<React.SetStateAction<any[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  const updateEntry = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    index: number,
    key: string,
    value: string,
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)))
  }

  return (
    <form className="space-y-8 max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Identification Records Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client">Client</Label>
              <Input id="client" />
            </div>
            <div>
              <Label htmlFor="requestDate">Request Date</Label>
              <Input id="requestDate" type="date" />
            </div>
            <div>
              <Label htmlFor="returnDate">Return Date</Label>
              <Input id="returnDate" type="date" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" />
            </div>
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input id="reference" />
            </div>
            <div>
              <Label htmlFor="candidate">Candidate</Label>
              <Input id="candidate" />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" />
            </div>
            <div>
              <Label htmlFor="idType">Identification Type</Label>
              <Select>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Candidate's Records
            <Button type="button" variant="outline" size="icon" onClick={() => addEntry(setCandidateRecords)}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
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
                      onClick={() => removeEntry(setCandidateRecords, index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Education History
            <Button type="button" variant="outline" size="icon" onClick={() => addEntry(setEducationEntries)}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institution</TableHead>
                <TableHead>Program/Degree</TableHead>
                <TableHead>Dates Attended</TableHead>
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
                    <Input
                      value={entry.dates}
                      onChange={(e) => updateEntry(setEducationEntries, index, "dates", e.target.value)}
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
                      onClick={() => removeEntry(setEducationEntries, index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Candidate's Reference Check
            <Button type="button" variant="outline" size="icon" onClick={() => addEntry(setReferenceEntries)}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
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
                      onClick={() => removeEntry(setReferenceEntries, index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Candidate's Employment History Check
            <Button type="button" variant="outline" size="icon" onClick={() => addEntry(setEmploymentEntries)}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization Name</TableHead>
                <TableHead>Dates Employed</TableHead>
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
                    <Input
                      value={entry.dates}
                      onChange={(e) => updateEntry(setEmploymentEntries, index, "dates", e.target.value)}
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
                      onClick={() => removeEntry(setEmploymentEntries, index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Additional Checks
            <Button type="button" variant="outline" size="icon" onClick={() => addEntry(setAdditionalChecks)}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
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
                      onClick={() => removeEntry(setAdditionalChecks, index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification Officers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="verifiedBy">Verified By</Label>
            <Input id="verifiedBy" />
          </div>
          <div>
            <Label htmlFor="screeningOfficer">Identity Screening Officer</Label>
            <Input id="screeningOfficer" />
          </div>
        </CardContent>
      </Card>

      <Button type="submit">Submit Background Check</Button>
    </form>
  )
}

