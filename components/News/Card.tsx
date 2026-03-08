import Image from "next/image";

const Card = () => {
    return (
        <div className="w-93 h-143 shadow-custom rounded-sm flex flex-col gap-4.5">
            <Image
                src="/landing_content_health.jpg"
                alt="landing_content_health"
                width={372}
                height={286}
                className="h-1/2 object-cover"
            />
            <h1 className="mx-5 subtitle line-clamp-2">
                Wordscope, una herramienta de TAC novedosa
            </h1>
            <p className="mx-5 text line-clamp-4">
                Hace tiempo, escribí un artículo sobre en qué herramientas de
                traducción asistida por computadora (TAC) recomendaba invertir y
                comentaba sobre algunas CAT tools tradicionales y gratuitas.
                Esta vez, les cuento sobre una CAT tool nueva que probé hace
                poco: Wordscope.
            </p>
            <p className="mx-5 label">20 de marzo de 2023</p>
        </div>
    );
};

export default Card;
