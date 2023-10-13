'use client'
import styles from './page.module.css'
export default function Modal({modaldata,edit,deletes,close}){

    return(

           <div className={styles.container} >
              <form className={styles.form} onSubmit={(e)=>{edit(e,modaldata)}}>
                  <input className={styles.input} defaultValue={modaldata.title}/>
                  <button className={styles.btnsub} type='submit'>ยืนยัน</button>
                  <button className={styles.btnstop} onClick={()=>{close(false)}}>ยกเลิก</button>

              </form>
              <button className={styles.btndel}  onClick={()=>{deletes(modaldata)}}>ลบ</button>
           </div>

    )
}