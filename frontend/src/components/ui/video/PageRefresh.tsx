"use client";
import { createContext, useContext } from "react";

export const RefreshContext = createContext<() => void>(() => {});
export const useRefreshNode = () => useContext(RefreshContext);
