import { Avatar, Style } from "@dicebear/core"
import gaze from "@dicebear/styles/gaze.json"
import Image from "next/image"

import { cn } from "@/lib/utils"

// Validate the style definition once and reuse it for every avatar.
const gazeStyle = new Style(gaze)

export function ChatAvatar({
  seed,
  animated = false,
  className,
}: {
  seed: string
  animated?: boolean
  className?: string
}) {
  const src = new Avatar(gazeStyle, {
    seed,
    // Gaze animates (wandering eyes, blinks, hops) only when a variant is set.
    animationVariant: [animated ? "medium" : "none"],
  }).toDataUri()

  return (
    <Image
      src={src}
      alt=""
      width={32}
      height={32}
      unoptimized
      className={cn("size-8 shrink-0 rounded-full", className)}
    />
  )
}
