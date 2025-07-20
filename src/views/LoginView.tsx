import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import ErrorMessage from '../components/ErrorMessage'
import { LoginForm } from '../types'
import api from '../config/axios'

export default function LoginView() {
  const navigate = useNavigate()
  const initialValues: LoginForm = {
    email: '',
    password: ''
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData)
      localStorage.setItem('AUTH_TOKEN', data)
      navigate('/admin')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error)
      }
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEF8E8' }}>
      {/* FONDO PRINCIPAL: #304A42 (verde oscuro) */}

      <h1 className='text-4xl text-[#D28F2C] font-bold'>Iniciar Sesión</h1>
      {/* TÍTULO: Mantiene texto blanco sobre fondo #304A42 */}

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="px-5 py-20 rounded-lg space-y-10 mt-10"
        style={{ backgroundColor: '#3A6D50' }}
        noValidate
      >
        {/* FORMULARIO: Mantiene fondo blanco para contraste */}

        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl" style={{ color: '#fdfefe' }}>
            E-mail
          </label>
          {/* LABELS: #3A6D50 (verde medio) */}

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="border-none p-3 rounded-lg placeholder-slate-400"
            style={{ backgroundColor: '#FAF4E8' }}
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {/* INPUTS: #FAF4E8 (beige claro) */}

          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl" style={{ color: '#FEF8E8' }}>
            Password
          </label>
          {/* LABELS: #3A6D50 (verde medio) */}

          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="border-none p-3 rounded-lg placeholder-slate-400"
            style={{ backgroundColor: '#FAF4E8' }}
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {/* INPUTS: #FAF4E8 (beige claro) */}

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
          style={{ backgroundColor: '#D28F2C' }}
          value='Iniciar Sesión'
        />
        {/* BOTÓN: #D28F2C (naranja/dorado) con texto blanco */}
      </form>

      <nav className='mt-10'>
        <Link
          className='text-center text-lg block'
          style={{ color: '#3A6D50' }}
          to="/auth/register"
        >¿No tienes cuenta? Crea una aquí</Link>
      </nav>
      {/* ENLACE: Mantiene texto blanco sobre fondo #304A42 */}
    </div>
  )
}