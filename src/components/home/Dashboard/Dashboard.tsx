import "./dashboard.css";

export default function Dashboard() {
    return (
        <div className="w-full h-[200px] md:h-[300px] lg:h-[400px] flex flex-col items-center justify-center text-center text-white p-8 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500">
            <h1 className="text-4xl md:text-5xl font-bold">Bienestar para Latinoamérica</h1>
            <h3 className="text-lg md:text-2xl max-w-3xl mt-4">
                Con fórmulas, servicios y conocimientos en Medicina Funcional para despertar tu naturaleza.
            </h3>
        </div>
    );
}