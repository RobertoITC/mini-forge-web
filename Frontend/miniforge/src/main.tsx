import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './Contexts/AuthContext.tsx'
import React from 'react'
import {CartProvider} from "./Contexts/CartContext.tsx";

createRoot(document.getElementById('root')!).render(

        <React.StrictMode>

            <AuthProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </AuthProvider>
        </React.StrictMode>

)
