import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout,user} = useAuth();
    return (

        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg print:hidden">
            <Link to={
                isAuthenticated ? "/tasks" : "/"
            }>
                <h1 className="text-2xl font-bold border border-black px-4 py-2 rounded-md hover:bg-zinc-300 transition">Equipos registrados</h1>
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                        <li className="text-yellow-500">Bienvenido {user.username}</li>
                        <li>
                            <Link to="/add-task" className="bg-indigo-500 px-4 py-1 rounded-sm">Añadir Entradas</Link>
                        </li>
                        <li>
                            <Link to="/home" className="bg-indigo-500 px-4 py-1 rounded-sm">Buscar equipos</Link>
                        </li>
                        <li>
                            <Link to="/home"
                            className="bg-indigo-500 px-4 py-1 rounded-sm"
                                onClick={() => {
                                    logout();
                                }}>Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className="bg-yellow-500 text-black font-bold px-4 py-1 rounded-sm">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="bg-yellow-500 text-black font-bold px-4 py-1 rounded-sm">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;
