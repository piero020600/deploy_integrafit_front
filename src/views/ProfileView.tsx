import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import ErrorMessage from '../components/ErrorMessage'
import { ProfileForm, User } from '../types'
import { updateProfile, uploadImage } from '../api/DevTreeAPI'

export default function ProfileView() {
    const queryClient = useQueryClient()
    const data : User = queryClient.getQueryData(['user'])!

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({ defaultValues: {
        handle: data.handle,
        description: data.description
    } })

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    const uploadImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    image: data
                }
            })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            uploadImageMutation.mutate(e.target.files[0])
        }
    }

    const handleUserProfileForm = (formData: ProfileForm) => {
        const user : User = queryClient.getQueryData(['user'])!
        user.description = formData.description
        user.handle = formData.handle
        updateProfileMutation.mutate(user)
    }

    return (
        <form
            className="p-10 rounded-lg space-y-5"
            style={{ backgroundColor: '#3A6D50' }}
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            {/* FORMULARIO: #3A6D50 (verde medio) */}
            
            <legend 
                className="text-2xl text-center"
                style={{ color: '#FEF8E8' }}
            >
                Editar Información
            </legend>
            {/* TÍTULO: #FEF8E8 (beige claro) sobre fondo verde */}
            
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                    className="text-white"
                >
                    Handle:
                </label>
                {/* LABELS: Texto blanco sobre fondo verde */}
                
                <input
                    type="text"
                    className="border-none rounded-lg p-2"
                    style={{ backgroundColor: '#FAF4E8' }}
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', {
                        required: "El Nombre de Usuario es obligatorio"
                    })}
                />
                {/* INPUTS: #FAF4E8 (beige claro) */}

                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                    className="text-white"
                >
                    Descripción:
                </label>
                <textarea
                    className="border-none rounded-lg p-2"
                    style={{ backgroundColor: '#FAF4E8' }}
                    placeholder="Tu Descripción"
                    {...register('description', {
                        required: "La Descripción es obligatoria"
                    })}
                />

                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="image"
                    className="text-white"
                >
                    Imagen:
                </label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="border-none rounded-lg p-2"
                    style={{ backgroundColor: '#FAF4E8' }}
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="p-2 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
                style={{ backgroundColor: '#D28F2C' }}
                value='Guardar Cambios'
            />
            {/* BOTÓN: #D28F2C (dorado) con texto blanco */}
        </form>
    )
}