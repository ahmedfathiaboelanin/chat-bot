import { useState } from "react"
import FormInput from "../../components/Ui/FormInput"
import { FaUserLarge } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import useAuthStore from "../../Stores/useAuthStore"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { login } = useAuthStore()
    const handleSubmit = async (e) => {
        e.preventDefault();
        login({username, password}, navigate)
    }
    return (
        <main className="h-screen w-full flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md flex flex-col gap-4 min-w-md">
                <div className="flex justify-center w-full">
                    <FaUserLarge className="text-7xl text-indigo-500"/>
                </div>
                <FormInput label="Username:" state={username} setState={setUsername} type="text" isRequired />
                <FormInput label="Password:" state={password} setState={setPassword} type="password" isRequired />
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded" type="submit">Login</button>
            </form>
        </main>
    )
}

export default Login