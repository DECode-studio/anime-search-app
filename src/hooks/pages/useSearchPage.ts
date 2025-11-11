import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectSearchState, setPage, setQuery } from '../../features/search/searchSlice'
import { useAnimeSearchQuery } from '../api/useAnimeSearchQuery'
import { useDebouncedValue } from '../common/useDebouncedValue'

export const useSearchPage = () => {
  const dispatch = useAppDispatch()
  const { query, page, pageSize } = useAppSelector(selectSearchState)
  const debouncedQuery = useDebouncedValue(query, 250)
  const isReadyToSearch = debouncedQuery.trim().length > 0
  const heroRef = useRef<HTMLDivElement | null>(null)
  const resultsRef = useRef<HTMLDivElement | null>(null)

  const { data, isPending, isError, error } = useAnimeSearchQuery({
    query: debouncedQuery,
    page,
    limit: pageSize,
    enabled: isReadyToSearch,
  })

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
    if (!resultsRef.current) return
    if (!data?.data?.length) return

    const cards = resultsRef.current.querySelectorAll('[data-anime-card]')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 },
      )
    }, resultsRef)

    return () => ctx.revert()
  }, [data?.data])

  const handleQueryChange = (value: string) => {
    dispatch(setQuery(value))
  }

  const handlePageChange = (nextPage: number) => {
    dispatch(setPage(nextPage))
  }

  return {
    data,
    page,
    query,
    debouncedQuery,
    isReadyToSearch,
    isPending,
    isError,
    errorMessage: error instanceof Error ? error.message : undefined,
    handleQueryChange,
    handlePageChange,
    heroRef,
    resultsRef,
  }
}
