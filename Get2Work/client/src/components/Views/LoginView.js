import { Route, Routes } from "react-router-dom"
import Login from "../Login"
import Register from "../Register"
import UserError from "../../UserError"






export const LoginView = () => {
    return <>

        <main>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route path="register" element={<Register />} />
                <Route path="/user-not-found" element={<UserError />} />
                <Route path="*" element={<p>Whoops, nothing here...</p>} />

            </Routes>
        </main>
    </>

}