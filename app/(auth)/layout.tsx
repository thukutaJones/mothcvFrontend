import React from 'react'

const Layoout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default Layoout
