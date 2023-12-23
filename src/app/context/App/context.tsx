import React, { useContext } from 'react';

interface AppContextType {
    visible: string
    setVisible: (visible: string) => void
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export default AppContext;

export const useApp = () => useContext(AppContext);
