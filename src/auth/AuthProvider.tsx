import { SessionProvider } from "next-auth/react"

interface Props {
    children: React.ReactNode
}
export const AuthProvider = ({ children } : Props) => {
    <SessionProvider>
        {children}
    </SessionProvider>
}