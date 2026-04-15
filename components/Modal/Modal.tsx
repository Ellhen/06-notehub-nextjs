'use client'

import { useEffect, type ReactNode, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

interface Props {
  children: ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: Props) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleBackdropClick = (): void => {
    onClose()
  }

  const handleModalClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation()
  }

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
    >
      <div
        className={css.modal}
        onClick={handleModalClick}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
