"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

export default function StatsBar({
  stat,
  isDark,
}: {
  stat: { base_stat: number; name: string }
  isDark: boolean
}) {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
  const percent = Math.round((stat.base_stat / 255) * 100)

  return (
    <div>
      <div className="flex justify-between py-1 text-sm font-medium leading-none">
        <span className="uppercase">{stat.name}</span>
        <span>
          {stat.base_stat} <span className="text-[8px]"> / 255</span>
        </span>
      </div>
      <Progress value={progress} style={{ width: `${percent}%` }} />
    </div>
  )
}
