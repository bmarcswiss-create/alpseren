'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 241
const FRAME_PATH = (n: number) =>
  `/frames/frame_${String(n).padStart(4, '0')}.webp`

export default function VideoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const frames: HTMLImageElement[] = new Array(FRAME_COUNT)
    let loadedCount = 0
    let currentFrame = 0

    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawFrame(currentFrame)
    }
    resize()
    window.addEventListener('resize', resize)

    function drawFrame(index: number) {
      const img = frames[index]
      if (!img?.complete || !img.naturalWidth) return
      const { width: cw, height: ch } = canvas
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    const triggers: ScrollTrigger[] = []

    function initScroll() {
      const container = document.getElementById('scroll-container')
      if (!container) return

      // Circle-wipe reveal as hero fades out
      const wipe = gsap.fromTo(
        canvas,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(150% at 50% 50%)',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '8% top',
            scrub: 1,
          },
        }
      )
      if (wipe.scrollTrigger) triggers.push(wipe.scrollTrigger)

      // Frame scrub
      const frameTrigger = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate(self) {
          const index = Math.min(
            Math.floor(self.progress * FRAME_COUNT),
            FRAME_COUNT - 1
          )
          if (index !== currentFrame) {
            currentFrame = index
            drawFrame(currentFrame)
          }
        },
      })
      triggers.push(frameTrigger)
    }

    function loadOne(i: number) {
      const img = new Image()
      const done = () => {
        loadedCount++
        if (i === 0 && img.complete && img.naturalWidth) drawFrame(0)
        if (loadedCount === FRAME_COUNT) initScroll()
      }
      img.onload = done
      img.onerror = done
      img.src = FRAME_PATH(i + 1)
      frames[i] = img
    }

    for (let i = 0; i < 10; i++) loadOne(i)
    setTimeout(() => {
      for (let i = 10; i < FRAME_COUNT; i++) loadOne(i)
    }, 150)

    return () => {
      lenis.destroy()
      triggers.forEach(t => t.kill())
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, backgroundColor: '#2D2926' }}
    />
  )
}
