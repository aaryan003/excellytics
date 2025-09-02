import React from "react"
import { useState, useEffect } from "react"
import { FileSpreadsheet, Upload, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { formatDistanceToNow } from "date-fns"

import fileService from "../services/fileService"

function UploadPage() {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadStatus, setUploadStatus] = useState("idle") // "idle" | "uploading" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("")
  const [fileHistory, setFileHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch file history when component mounts
    const fetchFileHistory = async () => {
      try {
        const files = await fileService.listFiles()
        setFileHistory(files)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch file history:", error)
        setIsLoading(false)
      }
    }
    
    fetchFileHistory()
  }, [])

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (isValidExcelFile(selectedFile)) {
        setFile(selectedFile)
        setUploadStatus("idle")
        setErrorMessage("")
      } else {
        setFile(null)
        setUploadStatus("error")
        setErrorMessage("Please upload a valid Excel file (.xls or .xlsx)")
      }
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (isValidExcelFile(droppedFile)) {
        setFile(droppedFile)
        setUploadStatus("idle")
        setErrorMessage("")
      } else {
        setFile(null)
        setUploadStatus("error")
        setErrorMessage("Please upload a valid Excel file (.xls or .xlsx)")
      }
    }
  }

  const isValidExcelFile = (file) => {
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel.sheet.macroEnabled.12",
    ]
    return validTypes.includes(file.type) || file.name.endsWith(".xls") || file.name.endsWith(".xlsx")
  }

  const handleUpload = async () => {
    if (!file) return

    setUploadStatus("uploading")

    try {
      await fileService.uploadFile(file)
      setUploadStatus("success")
      
      // Refresh file history after successful upload
      const files = await fileService.listFiles()
      setFileHistory(files)
      
      // Clear file after successful upload (optional)
      setTimeout(() => {
        setFile(null)
        setUploadStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Upload failed:", error)
      setUploadStatus("error")
      setErrorMessage(error.response?.data?.message || "Upload failed. Please try again.")
    }
  }

  const clearFile = () => {
    setFile(null)
    setUploadStatus("idle")
    setErrorMessage("")
  }

  const viewFileDetails = (fileId) => {
    navigate(`/files/${fileId}`)
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold md:text-2xl">Upload Excel File</h1>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <Tabs defaultValue="upload" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="history">Upload History</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Excel File</CardTitle>
                <CardDescription>Upload an Excel file (.xls or .xlsx) to analyze and generate charts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadStatus === "error" && (
                  <Alert variant="destructive">
                    <X className="h-4 w-4" />
                    <AlertTitle>Upload Error</AlertTitle>
                    <AlertDescription>{errorMessage || "Please upload a valid Excel file (.xls or .xlsx)."}</AlertDescription>
                  </Alert>
                )}

                {uploadStatus === "success" && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <FileSpreadsheet className="h-4 w-4" />
                    <AlertTitle>Upload Successful</AlertTitle>
                    <AlertDescription>
                      Your file has been uploaded successfully. You can now analyze it.
                    </AlertDescription>
                  </Alert>
                )}

                <div
                  className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 transition-colors ${
                    isDragging ? "border-primary bg-primary/5" : "border-border"
                  } ${file ? "bg-muted/50" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {!file ? (
                    <>
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <Upload className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">Drag & Drop your Excel file here</h3>
                      <p className="mt-2 text-sm text-muted-foreground">or click to browse from your computer</p>
                      <Label htmlFor="file-upload" className="mt-4">
                        <div className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer">
                          Browse Files
                        </div>
                        <Input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".xls,.xlsx"
                        />
                      </Label>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Supported formats: .xls, .xlsx (Max size: 10MB)
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FileSpreadsheet className="h-16 w-16 text-primary" />
                      <h3 className="mt-4 text-lg font-medium">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm" onClick={clearFile}>
                          Remove
                        </Button>
                        <Button size="sm" onClick={handleUpload} disabled={uploadStatus === "uploading"}>
                          {uploadStatus === "uploading" ? "Uploading..." : "Upload File"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium">Upload Guidelines</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                    <li>File must be in Excel format (.xls or .xlsx)</li>
                    <li>Maximum file size is 10MB</li>
                    <li>First row should contain column headers</li>
                    <li>Data should be properly formatted in columns</li>
                    <li>Avoid merged cells for best results</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate('/files')}>Back to Files</Button>
                <Button onClick={handleUpload} disabled={!file || uploadStatus === "uploading"}>
                  {uploadStatus === "uploading" ? "Uploading..." : "Upload & Analyze"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload History</CardTitle>
                <CardDescription>View your recent file uploads and their status.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">Loading file history...</div>
                ) : fileHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No files have been uploaded yet.
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                      <div>File Name</div>
                      <div>Date</div>
                      <div>Size</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="divide-y">
                      {fileHistory.map((item) => (
                        <div key={item.id} className="grid grid-cols-5 gap-4 p-4">
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                            <span className="truncate">{item.originalName}</span>
                          </div>
                          <div className="text-muted-foreground">
                            {formatDistanceToNow(new Date(item.uploadedAt), { addSuffix: true })}
                          </div>
                          <div className="text-muted-foreground">{formatFileSize(item.fileSize)}</div>
                          <div>
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                              Uploaded
                            </span>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm" onClick={() => viewFileDetails(item.id)}>
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default function Upload() {
  return <UploadPage />
}