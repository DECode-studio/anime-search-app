import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAnimeDetailQuery } from '../api/useAnimeDetailQuery'

export const useAnimeDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement | null>(null)
  const detailRef = useRef<HTMLDivElement | null>(null)

  const { data, isPending, isError, error } = useAnimeDetailQuery(id)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current) return
      gsap.fromTo(
        heroRef.current.children,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    const detailEl = detailRef.current
    if (!detailEl) return
    if (!data?.data) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        detailEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      )

      const sections = detailEl.querySelectorAll('[data-detail-section]')
      if (sections.length) {
        gsap.fromTo(
          sections,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08, delay: 0.1 },
        )
      }
    }, detailEl)

    return () => ctx.revert()
  }, [data?.data])

  const handleBack = () => navigate(-1)

  return {
    data,
    isPending,
    isError,
    errorMessage: error instanceof Error ? error.message : undefined,
    handleBack,
    heroRef,
    detailRef,
  }
}
