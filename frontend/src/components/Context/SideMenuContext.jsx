import { createContext, useState } from 'react'

export const SideMenuContext = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {}
})

const SideMenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(v => !v)

  return (
    <SideMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </SideMenuContext.Provider>
  )
}

export default SideMenuProvider
