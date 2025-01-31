import "../Dashboard/dashboard.css";

export default function History() {
    return (
        <div className="w-full min-h-[250px] md:min-h-[350px] lg:min-h-[450px] flex flex-col items-center justify-center text-center text-white px-6 py-8 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-500">
            <h1 className="text-3xl md:text-5xl font-bold">Un sueño Hecho realidad</h1>
            <h3 className="text-lg md:text-2xl max-w-3xl mt-4 leading-relaxed">
                En el año 2011, Nutrabiotics nació en Colombia como el sueño de Benoit Raby y Luc Lemaire, dos médicos canadienses con formación y amplia experiencia en Medicina funcional, a quienes se les uniría un gran amigo y colega colombiano, Javier Galvis; para crear y proveer herramientas que permitieran desarrollar estrategias terapéuticas.
            </h3>
        </div>
    );
}