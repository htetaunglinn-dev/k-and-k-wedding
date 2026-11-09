import "./globals.css";
import {LanguageProvider} from "./Language";
import {Toaster} from "@/components/ui/sonner";
export const metadata={title:"K & K · March 21, 2027",description:"Celebrate the wedding of Aung Khine Soe and Htet Thiri Khine in Tokyo."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><LanguageProvider>{children}</LanguageProvider><Toaster position="bottom-right" theme="light" style={{"--normal-bg":"#fffdf7","--normal-text":"var(--ink)","--normal-border":"var(--line)","--border-radius":"2px",fontFamily:"inherit"} as React.CSSProperties}/></body></html>}