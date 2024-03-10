import { createContext } from 'react';
export type MatchingContext = {
    files: FileList | null,
    setFile: (f: FileList | null) => void;
};
export const MatchesContext = createContext<MatchingContext | null>(null);