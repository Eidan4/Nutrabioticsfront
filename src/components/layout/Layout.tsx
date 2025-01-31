import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center w-full min-h-[calc(100vh-8rem)] layout-content">
                {children}
            </main>
            <Footer />
        </div>
     );
}