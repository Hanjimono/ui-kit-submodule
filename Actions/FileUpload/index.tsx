// system
import { useRef, useState } from "react"
// ui
import Icon from "@/ui/Presentation/Icon"
import Text from "@/ui/Presentation/Text"
import Button from "@/ui/Actions/Button"
import { formatClassnames } from "@/ui/Skeleton/utils"
// types and styles
import { FileUploadProps } from "./types"

/**
 * FileUpload component allows users to upload a file by either dragging and dropping it into the designated area or by browsing their file system.
 *
 * @param {string} className - Additional class names to style the component.
 * @param {string} [placeholder="Drop to upload file"] - Placeholder text displayed when no file is uploaded.
 * @param {function} onFileChange - Callback function triggered when a file is uploaded or removed.
 */
const FileUpload = ({
  className,
  placeholder = "Drop to upload file",
  onFileChange
}: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const fileInput = useRef<HTMLInputElement>(null)
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (uploadedFiles.length > 1) return
    const droppedFiles = event.dataTransfer.files
    if (droppedFiles.length >= 1) {
      setUploadedFiles([droppedFiles[0]])
      if (onFileChange) onFileChange(droppedFiles[0])
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFiles([event.target.files[0]])
      if (onFileChange) onFileChange(event.target.files[0])
    }
  }
  const handleFileRemove = () => {
    setUploadedFiles([])
    if (onFileChange) onFileChange()
  }
  const onBrowseClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  return (
    <div
      className={formatClassnames(
        "border border-dotted bg-block-500/75 border-form-border min-h-36 min-w-36 flex flex-col items-center justify-center rounded-lg",
        className
      )}
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      {uploadedFiles.length > 0 && (
        <div>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative group cursor-default"
            >
              <Icon
                className="mb-close leading-8"
                name="description"
                type="md"
                size={32}
              />
              <Text className="px-2" size="extra-small" type="fit-line">
                {file.name}
              </Text>
              <Button
                className="absolute top-0 right-0 h-4 group-hover:opacity-100 opacity-0 cursor-pointer"
                icon="delete"
                onClick={handleFileRemove}
                isText
                remove
                iconSize={16}
              />
            </div>
          ))}
        </div>
      )}
      {uploadedFiles.length == 0 && (
        <Icon className="mb-close" name="upload" type="md" size={32} />
      )}
      {uploadedFiles.length == 0 && (
        <Text className="px-2" size="small">
          {placeholder}
        </Text>
      )}
      {uploadedFiles.length == 0 && (
        <Text className="px-2" size="extra-small">
          or
        </Text>
      )}
      {uploadedFiles.length == 0 && (
        <Button
          className="h-8 py-2 px-2 text-xs mt-close"
          secondary
          onClick={onBrowseClick}
        >
          Browse file
        </Button>
      )}
      <input type="file" hidden ref={fileInput} onChange={handleFileChange} />
    </div>
  )
}

export default FileUpload
