import React from 'react'

const Footer = ({activeTaskCount = 0, completeTaskCount = 0}) => {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-2 bg-transparent text-white/70">
      {activeTaskCount + completeTaskCount > 0 && (
        <div className='text-center'>
          <p className='text-sm text-muted-foreground'>
            {completeTaskCount > 0 && (
              <>
                Tuyệt vời! Bạn đã hoàn thành {completeTaskCount} nhiệm vụ
                {activeTaskCount > 0 && (
                  <>, còn {activeTaskCount} nhiệm vụ đang làm</>
                )}.
              </>
            )}
            {completeTaskCount === 0 && activeTaskCount > 0 && (
              <>
                Hãy hoàn thành {activeTaskCount} nhiệm vụ nào!
              </>
            )}
          </p>
        </div>
      )}

      <p className="mt-4 text-center">
        Copyright © {new Date().getFullYear()} by <span className='font-bold text-primary'>FogVN</span>. All rights reserved.
      </p>
      <div className="flex items-center gap-4 mt-5">
        {/* facebook */}
        <a href="https://www.facebook.com/nguyenthietduydan" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        {/* linkin */}
        <a href="https://www.linkedin.com/in/nguyenthietduydan/" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        {/* github */}
        <a href="https://github.com/nguyenduydan" className="hover:-translate-y-0.5 transition-all duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 18c-4.51 2-5-2-7-2" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer
