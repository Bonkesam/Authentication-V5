import React from 'react'

const AuthLayout = ({ children } : { children: React.ReactNode}) => {
  return (
    <div className='h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1bb7ff] to-[#04244b]'>
      {children}
    </div>
  )
}

export default AuthLayout;