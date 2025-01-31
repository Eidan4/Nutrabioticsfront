import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex text-black content-with-max ">
            <aside className="w-64 min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 text-white p-6 flex flex-col">
            {/* Logo */}
            <div className="flex justify-center mb-6">
                <Image 
                src="https://nutrabiotics.info/_next/static/media/logo-dark.595cdc64.png" 
                alt="Logo" 
                width={100} 
                height={50} 
                className="object-contain"
                />
            </div>

            <nav className="flex flex-col space-y-4">
                <Link href="/admin/orders" className="nav-link">Órdenes</Link>
                <Link href="/admin/products" className="nav-link">Productos</Link>
            </nav>
            </aside>
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
}