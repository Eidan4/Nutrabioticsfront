"use client";

export default function ErrorModal({ message, onClose }: { message: string | null; onClose: () => void }) {
    if (!message) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
                <p className="text-gray-700">{message}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}