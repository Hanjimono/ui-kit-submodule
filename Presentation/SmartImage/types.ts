import { ImageProps } from "next/image"

export type SmartImageProps = Omit<ImageProps, "src"> & {
  src?: string
}
