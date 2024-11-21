import {
    createBrowserRouter, Outlet, RouterProvider,
} from 'react-router-dom'
import React from 'react'
import Home from "./components/home/Home";
import Building from "./components/buildingPage/Building";
import RoomInfo from "./components/roomInfo/RoomInfo";
import Error from "./components/error/Error";
import Account from './components/accountPage/Account';

const router = createBrowserRouter([
    {
        "path": "/",
        children: [
            {
                "path": "/",
                "element": <Home />,
            },
            {
                "path": "/building/:buildingName",
                "element": <Building />,
            },
            {
                "path": "/building/:buildingName/room/:roomName",
                "element": <RoomInfo />,
            },
            {
                "path": "*",
                "element": <Error />,
            },
            {
                "path": "/account",
                "element": <Account />,
            }
        ]
    },
])


export function Router() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}