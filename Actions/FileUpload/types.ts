export interface FileUploadProps {
  /** Classes */
  className?: string
  /** Placeholder */
  placeholder?: string
  /** Uploaded files callback */
  onFileChange?: (file?: File) => void
}
