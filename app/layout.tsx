import "./globals.css";
import {LanguageProvider} from "./Language";
export const metadata={title:"K & K · March 21, 2027",description:"Celebrate the wedding of Aung Khine Soe and Htet Thiri Khine in Tokyo."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><LanguageProvider>{children}</LanguageProvider></body></html>}