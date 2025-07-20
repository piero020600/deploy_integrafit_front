import { Link } from 'react-router-dom'

export default function Logo() {
    return (
        <Link to={'/'}>
            <img src="/logo.svg" className="w-60 h-auto block mx-auto" alt='Logotipo Devtree' />
        </Link>
    )
}
