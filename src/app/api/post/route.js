import { NextResponse } from "next/server"
import { promises as fs } from 'fs';
export const GET = async (request)=>{
    try {
        const file = await fs.readFile(process.cwd() + '/src/data/data.json', 'utf8');
        const data = await JSON.parse(file);
         return new NextResponse(JSON.stringify(data),{status:200})
    } catch (error) {
        return new NextResponse("Error",{status:500})
    }
 
}

export const POST = async (request)=>{
    const  body = await request.json();
    const jdata ={
        "task":[]
    }
    try {
      const file = await fs.readFile(process.cwd() + '/src/data/data.json', 'utf8');
        const data = await JSON.parse(file);
        const rawdata = JSON.stringify(data); 
        await data.task.push(body) 
        console.log(typeof body) 
        
      
        fs.writeFile(process.cwd() + '/src/data/data.json',JSON.stringify(data),"utf-8");  
         return new NextResponse("Post succes",{status:201})
    } catch (error) {
        return new NextResponse("Error",{status:500})
    }
 
}

 export const PUT = async (request)=>{
    const  body = await request.json();
    const jdata ={
        "task":[]
    }
    try {
      const file = await fs.readFile(process.cwd() + '/src/data/data.json', 'utf8');
        const data = await JSON.parse(file);
        const rawdata = JSON.stringify(data); 
        const num = data.task.findIndex((e)=>{
            return e.title === body.title.title
        })
        data.task[num].title = body.newTitle
        data.task[num].checkmark = body.title.checkmark 
        console.log(data.task[num])
      
        fs.writeFile(process.cwd() + '/src/data/data.json',JSON.stringify(data),"utf-8");  
         return new NextResponse("Post succes",{status:201})
    } catch (error) {
        return new NextResponse("Error",{status:500})
    }
 
} 
export const DELETE = async (request)=>{
    const  body = await request.json();
    const jdata ={
        "task":[]
    }
    try {
      const file = await fs.readFile(process.cwd() + '/src/data/data.json', 'utf8');
        const data = await JSON.parse(file);
        const rawdata = JSON.stringify(data); 
        const deletedata = await data.task.filter((e)=>{
            return e.title != body.title.title
        })
       /*  data.task[num].checkmark = body.checkmark */
        data.task = deletedata

      
      fs.writeFile(process.cwd() + '/src/data/data.json',JSON.stringify(data),"utf-8");  
         return new NextResponse("Post succes",{status:201})
    } catch (error) {
        return new NextResponse("Error",{status:500})
    }
 
}


