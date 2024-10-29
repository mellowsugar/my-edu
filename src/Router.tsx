import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Calculator} from 'src/pages/home/HomePage'
import type {Router as RouterType} from '@remix-run/router'

const router: RouterType = createBrowserRouter([
  {
    Component: Calculator,
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
