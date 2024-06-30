import { useEffect } from 'react'

// Generic bir element tipi ile daha güvenli bir hook tanımı
function useOutsideClick<T extends HTMLElement>(ref: React.RefObject<T>, callback: () => void): void {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [ref, callback])
}

export default useOutsideClick
