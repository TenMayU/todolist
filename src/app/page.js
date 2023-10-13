'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { FormEvent, useState } from 'react';
import useSWR, { mutate } from 'swr'
import Modal from '@/component/modal/modal';
/* async function getData(){
  const res = await fetch("http://localhost:3000/api/post",{
    cache:"no-store"
  });

  return res.json()
}
 */
/* function getData(){
  const allKeys = Object.keys(localStorage); 
  const data = []
  data.push(localStorage.getItem(allKeys[3]))

   return data  
} 
 */



export default function Home() {
  const [done, setDone] = useState()
  const [Modals, setModals] = useState()
  const [Modaldata, setModaldata] = useState()
  const [loader, setLoader] = useState(false)

  /*  const data = getData()
   console.log(data) */
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading, mutate } = useSWR('/api/post', fetcher)
  console.log(isLoading)
  function changemark(e) {
    const bodys = { newTitle: e.title, title: { title: e.title, checkmark: e.checkmark ? false : true } }
    console.log(bodys)
    fetch("/api/post", {
      method: "PUT",
      body: JSON.stringify(
        bodys
      )
    }
    )

  }

  function addtask(event) {

    const bodys = { title: event.target[0].value, checkmark: false }
    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(
        bodys
      )
    }
    )

    /* window.localStorage.setItem(event.target[0].value,JSON.stringify(false)) */
    /*  console.log(event) */
  }

  function openmodal(event) {

    if (Modals) {
      setModals(false)
    } else {
      setModals(true)
      setModaldata(event)
      console.log(Modaldata, Modals)
    }
  }

  function Edit(event, title) {
    /*  event.preventDefault() */
    const bodys = { newTitle: event.target[0].value, title: title }
    console.log(bodys)
    if (bodys) {
      fetch("/api/post", {
        method: "PUT",
        body: JSON.stringify(
          bodys
        )
      }
      ).then(
        mutate()
      )
      setModals(false)

    }
    else (
      alert('Pls type something')
    )

  }

  function Delete(title) {
    /*  event.preventDefault() */
    const bodys = { title: title }
    fetch("/api/post", {
      method: "DELETE",
      body: JSON.stringify(
        bodys
      )
    }
    ).then(
      mutate()
    )
    setModals(false)

  }
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.head} id='head'>
          <h1>Todolist</h1>
        </div>
        <div className={styles.todolist}>

          <form className={styles.addtask} onSubmit={addtask}>
            <input className={styles.inputtask} placeholder='Add Task' />
            <button type='submit'>AddTask</button>
          </form>

          {isLoading ? "Loading" :
            <div className={styles.checklists}>
              {data?.task.map((e, index) => {
                return (
                  <div className={styles.listitem} key={index} >
                    <input className={styles.checkbox} onClick={() => { changemark(e) }} type='checkbox' defaultChecked={e.checkmark ? true : false} />
                    <input className={styles.titlebox} disabled value={e.title} />
                    <button className={styles.btnedit} onClick={() => { openmodal(e) }}>แก้ไข</button>
                  </div>

                )
              })}
              {Modals ? <Modal modaldata={Modaldata} edit={Edit} deletes={Delete} close={setModals} /> : ""}

            </div>
          }
        </div>

      </div>

    </section>
  )
}
