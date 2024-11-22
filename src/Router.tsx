import {
    createBrowserRouter, Outlet, RouterProvider, HashRouter, createHashRouter
} from 'react-router-dom'
import React, { useEffect } from 'react'
import Home from "./components/home/Home";
import Building from "./components/buildingPage/Building";
import RoomInfo from "./components/roomInfo/RoomInfo";
import Error from "./components/error/Error";
import SearchResults from "./components/searchResults/SearchResults";
import Account from "./components/accountPage/Account";

const router = createHashRouter([
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
                "path": "/search",
                "element": <SearchResults />,
            },
            {
                "path": "/my-account",
                "element": <Account />,
            },
            {
                "path": "*",
                "element": <Error />,
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
