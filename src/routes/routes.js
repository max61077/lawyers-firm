import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import MainContainer from "../layout/MainContainer"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainContainer />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }
])