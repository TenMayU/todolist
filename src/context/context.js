/* import { createContext } from "react"
export const Context = createContext()
export const ThemProvider = async ({children})=>{
  const file = await fs.readFile(process.cwd() + '/src/data/data.json', 'utf8');
  const data = await JSON.parse(file);
    return (
    <ThemContext.Provider value={{data}}>
    {children} 
    </ThemContext.Provider>
    );
} */