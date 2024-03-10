'use client'
import { useState } from "react"
import { MatchesContext } from "./context"

export default function MatchesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [files, setFile] = useState<FileList | null>(null);

    return <>
        <MatchesContext.Provider value={{ files, setFile }}>
            {children}
        </MatchesContext.Provider>
    </>
}