import { createContext } from 'react'

function noop() { }

export const AuthContext = createContext({
    alert: '',
    setAlert: noop,
    clearAlert: noop,
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false,
})
