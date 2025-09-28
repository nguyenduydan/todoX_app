import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-stale-50">
      <img src="404_NotFound.png" alt="Khong tim thay" className='max-w-full mb-6 w-96' />
      <p className='text-xl font-semibold'>Bạn đang đi vô vùng cấm!!!</p>
      <a href="/" className='inline-block mt-6 px-6 py-3 font-medium text-white shadow-md transition bg-primary rounded-2xl hover:bg-primary-dark'>Quay về trang chủ</a>
      </div>
  )
}

export default NotFound
