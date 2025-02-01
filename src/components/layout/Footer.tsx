import { FaPhone, FaClock } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-purple-900 text-white py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                <div>
                    <h3 className="font-bold text-lg mb-2">Compañía</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/">Inicio</a></li>
                        <li><a href="https://nutrabiotics.info/nosotros">Nosotros</a></li>
                        <li><a href="https://nutrabiotics.info/aliados">Aliados</a></li>
                        <li><a href="https://nutrabiotics.info/contactanos">Contáctanos</a></li>
                        <li><a href="https://nutrabiotics.info/trabaja-con-nosotros">Trabaja con nosotros</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">Atención</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="https://nutrabiotics.info/pqrsf">PQRSF</a></li>
                        <li><a href="https://nutrabiotics.info/politicas">Políticas</a></li>
                        <li><a href="https://nutrabiotics.info/calidad">Calidad y certificados</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">De interés</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="https://ilumina.nutrabiotics.info/lots/readLotProductSubcategoryFront/23-012">Ilumina</a></li>
                        <li><a href="https://co.alivia.la">Alivia</a></li>
                        <li><a href="https://nhub.events/eventos/nutrabiotics/?v=ab6c04006660">Eventos</a></li>
                        <li><a href="https://nhub.events/ingreso/?_redirect_to=https%3A%2F%2Fnhub.events%2Fzona-educativa%2Fnutrabiotics%2F&v=ab6c04006660">Zona educativa</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                        <FaPhone className="mr-2" /> Contact Center
                    </h3>
                    <p className="text-sm">Bogotá: 601 443 0900</p>
                    <p className="text-sm">Cali: 602 380 8906</p>
                    <p className="text-sm">Medellín: 604 283 6948</p>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                        <FaClock className="mr-2" /> Horarios de atención
                    </h3>
                    <p className="text-sm">Lunes a viernes: 8:00 AM - 6:00 PM</p>
                    <p className="text-sm">Sábados: 8:00 AM - 1:00 PM</p>
                </div>


                <div>
                    <h3 className="font-bold text-lg mb-2">Certificados</h3>
                    <p className="text-sm">
                        Certificaciones del laboratorio de fabricación NUTRABIOTICS SAS cuenta con certificados en:
                    </p>
                </div>
            </div>

            <div className="border-t border-white mt-6 pt-4 text-center text-sm">
                LOS PIONEROS DE LA MEDICINA FUNCIONAL <strong>DESDE 2011</strong>
            </div>
        </footer>
    );
}