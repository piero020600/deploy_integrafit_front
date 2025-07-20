import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import type { RegisterForm } from '../types'
import ErrorMessage from '../components/ErrorMessage'
import api from '../config/axios'

export default function RegisterView() {
    const location = useLocation()
    const navigate = useNavigate()
    const initialValues : RegisterForm = {
        name: '',
        email: '',
        handle:  location?.state?.handle || '',
        password: '',
        password_confirmation: ''
    }

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({defaultValues : initialValues})

    const password = watch('password')

    const handleRegister = async (formData : RegisterForm) => {
        try {
            const {data} = await api.post(`/auth/register`, formData)
            toast.success(data)
            reset()
            navigate('/auth/login')
        } catch (error) {
            if(isAxiosError(error) && error.response ) {
                toast.error(error.response.data.error)
            }
        }
    }

    return (
        <>
            <h1 className='text-4xl font-bold' style={{ color: '#D28F2C' }}>Crear Cuenta</h1>
            {/* TÍTULO: #D28F2C (dorado) como en la imagen */}

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="px-5 py-20 rounded-lg space-y-10 mt-10"
                style={{ backgroundColor: '#3A6D50' }}
            >
                {/* FORMULARIO: #3A6D50 (verde medio) como en la imagen */}
                
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="name" className="text-2xl text-white">
                        Nombre
                    </label>
                    {/* LABELS: Texto blanco sobre fondo verde */}
                    
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="border-none p-3 rounded-lg placeholder-slate-400"
                        style={{ backgroundColor: '#FAF4E8' }}
                        {...register('name', {
                            required: "El nombre es obligatorio"
                        })}
                    />
                    {/* INPUTS: #FAF4E8 (beige claro) como en la imagen */}
                    
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>
                
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-white">
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="border-none p-3 rounded-lg placeholder-slate-400"
                        style={{ backgroundColor: '#FAF4E8' }}
                        {...register('email', {
                            required: "El Email es obligatorio", 
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>
                
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="handle" className="text-2xl text-white">
                        Handle
                    </label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="border-none p-3 rounded-lg placeholder-slate-400"
                        style={{ backgroundColor: '#FAF4E8' }}
                        {...register('handle', {
                            required: "El Handle es obligatorio"
                        })}
                    />
                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
                </div>
                
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-white">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="border-none p-3 rounded-lg placeholder-slate-400"
                        style={{ backgroundColor: '#FAF4E8' }}
                        {...register('password', {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: "El password debe ser mínimo de 8 caracteres"
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-white">
                        Repetir Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="border-none p-3 rounded-lg placeholder-slate-400"
                        style={{ backgroundColor: '#FAF4E8' }}
                        {...register('password_confirmation', {
                            required: "Repetir Password es obligatorio",
                            validate: (value) => value === password || 'Los passwords no son iguales'
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <input
                    type="submit"
                    className="p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
                    style={{ backgroundColor: '#D28F2C' }}
                    value='Crear Cuenta'
                />
                {/* BOTÓN: #D28F2C (dorado) con texto blanco */}
            </form>

            <nav className='mt-10'>
                <Link
                    className='text-center text-lg block'
                    style={{ color: '#3A6D50' }}
                    to="/auth/login"
                >¿Ya tienes una cuenta? Inicia Sesión</Link>
            </nav>
            {/* ENLACE: #3A6D50 (verde medio) sobre fondo beige */}
        </>
    )
}