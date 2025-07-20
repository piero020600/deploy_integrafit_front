import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView() {
    return (
        <>
            <Header />

            <main
                className="py-10 min-h-screen bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl"
                style={{ backgroundColor: '#FEF8E8' }}
            >
                {/* FONDO PRINCIPAL: #FEF8E8 (beige claro) */}

                <div className=" max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black" style={{ color: '#304A42' }}>
                            Bienestar <span style={{ color: '#D28F2C' }}>Inteligente </span>
                            Vida Saludable
                        </h1>
                        {/* TÍTULO: #304A42 (verde oscuro) con destacado #D28F2C (dorado) */}

                        <p
                            className="text-xl"
                            style={{ color: '#3A6D50' }}
                        >
                            Únete a una comunidad que está transformando su salud de manera práctica y sostenible.
                            Conecta con nutricionistas, entrenadores, coaches y emprendedores de productos naturales, todo desde una sola plataforma.
                            Descubre un espacio pensado para personas como tú, que desean adoptar un estilo de vida saludable pero necesitan orientación, motivación y soluciones accesibles.
                            Comparte tu perfil, accede a planes personalizados, productos recomendados y construye tu camino hacia el bienestar con el acompañamiento de expertos.
                        </p>
                        {/* PÁRRAFO: #3A6D50 (verde medio) */}

                        <SearchForm />
                    </div>
                </div>
            </main>
        </>
    )
}