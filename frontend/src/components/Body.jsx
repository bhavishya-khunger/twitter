import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Feed from './Feed';
import Premium from './Premium';
import Notifications from './Notifications';
import BookMarks from './BookMarks';
import Sample from './sample';
import Explore from './Explore';
import View from './View';

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    path: "/",
                    element: <Feed />
                },
                {
                    path: "/explore",
                    element: <Explore />
                },
                {
                    path: "/notifications",
                    element: <Notifications />
                },
                {
                    path: "/bookmarks",
                    element: <BookMarks />
                },
                {
                    path: "/profile/:username",
                    element: <Profile />
                },
                {
                    path: "/view/:id",
                    element: <View />
                }
            ]
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/premium_sign_up",
            element: <Premium />,
        },
        {
            path: "/sample",
            element: <Sample />
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body
