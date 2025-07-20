import { Link } from 'react-router-dom'

export default function HomeNavigation() {
  return (
    <>
      <Link
        className='px-4 py-3 uppercase font-black text-base cursor-pointer mr-4'
        style={{
          color: '#304A42',
          border: '2px solid #304A42',
          borderRadius: '8px',
        }}
        to='/auth/login'
      >
        Iniciar Sesión
      </Link>

      <Link
        className='px-6 py-3 uppercase font-black text-base cursor-pointer rounded-lg text-white'
        style={{ backgroundColor: '#3A6D50' }}
        to='/auth/register'
      >
        Registrarme
      </Link>
    </>
  )
}
