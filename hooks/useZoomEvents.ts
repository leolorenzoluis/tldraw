import React, { useEffect, useRef } from "react"
import state from "state"
import * as vec from "utils/vec"

export default function useZoomEvents(
  ref: React.MutableRefObject<SVGSVGElement>
) {
  const rTouchDist = useRef(0)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    function handleWheel(e: WheelEvent) {
      e.preventDefault()

      if (e.ctrlKey) {
        state.send("ZOOMED_CAMERA", {
          delta: e.deltaY,
          point: [e.pageX, e.pageY],
        })
        return
      }

      state.send("PANNED_CAMERA", {
        delta: [e.deltaX, e.deltaY],
        point: [e.pageX, e.pageY],
      })
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.ctrlKey) {
        e.preventDefault()
      }

      if (e.touches.length === 2) {
        const { clientX: x0, clientY: y0 } = e.touches[0]
        const { clientX: x1, clientY: y1 } = e.touches[1]

        const dist = vec.dist([x0, y0], [x1, y1])

        state.send("WHEELED", { delta: [0, dist - rTouchDist.current] })

        rTouchDist.current = dist
      }
    }

    element.addEventListener("wheel", handleWheel)
    element.addEventListener("touchstart", handleTouchMove)
    element.addEventListener("touchmove", handleTouchMove)

    return () => {
      element.removeEventListener("wheel", handleWheel)
      element.removeEventListener("touchstart", handleTouchMove)
      element.removeEventListener("touchmove", handleTouchMove)
    }
  }, [ref])

  return {}
}