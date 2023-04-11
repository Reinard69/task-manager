import React, { createContext, useContext, useState } from "react";

interface initialState {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
}

interface contextProps {
  activeMenu: boolean;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isClicked: initialState;
  setIsClicked: React.Dispatch<React.SetStateAction<initialState>>;
  handleClick: (itemClicked: string) => void;
  screenSize: number;
  setScreenSize: React.Dispatch<React.SetStateAction<number>>;
  currentColor: string;
  currentMode: string;
  setColor: (e: string) => void;
  setMode: (e: React.FormEvent<EventTarget>) => void;
  themeSettings: boolean;
  setThemeSettings: React.Dispatch<React.SetStateAction<boolean>>;
  initialState: initialState;
  handleSetMode: () => void;
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>;
}

const StateContext = createContext<contextProps>({} as contextProps);

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const UtilsProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState<number>(0);
  const [currentColor, setCurrentColor] = useState("#0E97BC");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);

  const setMode = (e: React.FormEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    setCurrentMode(target.value);
    localStorage.setItem("themeMode", target.value);
    setThemeSettings(false);
  };

  const handleSetMode = () => {
    if (currentMode === "Light") {
      setCurrentMode("Dark");
      localStorage.setItem("themeMode", "Dark");
      return;
    }
    setCurrentMode("Light");
    localStorage.setItem("themeMode", "Light");
    return;
  };
  const setColor = (e: string) => {
    setCurrentColor(e);
    localStorage.setItem("colorMode", e);
    setThemeSettings(false);
  };

  const handleClick = (itemClicked: string) => {
    setIsClicked({ ...initialState, [itemClicked]: true });
  };
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setColor,
        setMode,
        themeSettings,
        setThemeSettings,
        initialState,
        handleSetMode,
        setCurrentMode,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
