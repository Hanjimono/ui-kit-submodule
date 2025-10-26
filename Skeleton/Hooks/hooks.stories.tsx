import type { Meta, StoryObj } from "@storybook/react"
import React, { useRef, useState } from "react"
import {
  useOuterClick,
  useDynamicContainerSizes,
  useCloseOnWindowChange
} from "./index"
import Button from "@/ui/Actions/Button"

const meta: Meta = {
  title: "UI/Skeleton/Hooks",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Hooks helpers for UI skeleton: useOuterClick, useDynamicContainerSizes, useCloseOnWindowChange."
      }
    }
  },
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj

export const UseOuterClick: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    useOuterClick(() => setOpen(false), ref, open)
    return (
      <div
        style={{
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16
        }}
      >
        <Button onClick={() => setOpen(true)} primary>
          Open Box
        </Button>
        {open && (
          <div
            ref={ref}
            style={{ padding: 24, background: "#e0e7ef", borderRadius: 8 }}
          >
            Click outside to close
          </div>
        )}
      </div>
    )
  }
}

export const UseDynamicContainerSizes: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(true)
    const [height, width] = useDynamicContainerSizes(ref, active)
    return (
      <div
        style={{
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16
        }}
      >
        <Button onClick={() => setActive((a) => !a)}>Toggle Active</Button>
        <div
          ref={ref}
          style={{
            padding: 24,
            background: "#e0e7ef",
            borderRadius: 8,
            width: 200,
            height: 80
          }}
        >
          Height: {height}, Width: {width}
        </div>
      </div>
    )
  }
}

export const UseCloseOnWindowChange: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    useCloseOnWindowChange(() => setOpen(false))
    return (
      <div
        style={{
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16
        }}
      >
        <Button onClick={() => setOpen(true)} primary>
          Open Box
        </Button>
        {open && (
          <div style={{ padding: 24, background: "#e0e7ef", borderRadius: 8 }}>
            Resize or scroll window to close
          </div>
        )}
      </div>
    )
  }
}
