"use client";
import {createContext,useContext,useEffect,useState} from "react";
import {japanese} from "./translations";
type Language="en"|"ja";
const Context=createContext<{language:Language;t:(text:string)=>string}>({language:"en",t:s=>s});
export function LanguageProvider({children}:{children:React.ReactNode}){const [language,setLanguage]=useState<Language>("en");useEffect(()=>{try{if(localStorage.getItem("kk-language")==="ja")setLanguage("ja")}catch{}},[]);useEffect(()=>{document.documentElement.lang=language;document.title=language==="ja"?"K & K · 2027年3月21日 結婚式のご案内":"K & K · March 21, 2027"},[language]);function change(l:Language){setLanguage(l);try{localStorage.setItem("kk-language",l)}catch{}}return <Context.Provider value={{language,t:s=>language==="ja"?(japanese[s]??s):s}}><div className="language-switch" role="group" aria-label="Language / 言語"><button lang="en" onClick={()=>change("en")} aria-pressed={language==="en"}>English</button><span aria-hidden="true">/</span><button lang="ja" onClick={()=>change("ja")} aria-pressed={language==="ja"}>日本語</button></div>{children}</Context.Provider>}
export const useLanguage=()=>useContext(Context);
