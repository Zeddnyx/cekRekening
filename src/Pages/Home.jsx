import { useState, useEffect } from 'react'

export default function Home() {
  const [bank, setBank] = useState('')
  const [number, setNumber] = useState(0)
  const [info, setInfo] = useState('')
  const [load, setLoad] = useState(false)
  const [error, setError] = useState(null)

  const [list, setList] = useState([
    'BCA', 'Blu By BCA', 'BNI', 'BRI', 'Mandiri', 'CIMB NIAGA', 'Permata', 'Danamon', 'Bank DKI', 'BTPN/Jenius', 'Bank NOBU', 'Bank Jago', 'Line Bank', 'LinkAja!', 'GoPay', 'OVO', 'DANA'
  ])

  const cekrek = async (bank, number) => {
    setLoad(true)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("accountBank", bank);
    urlencoded.append("accountNumber", number);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    }

    try {
      const cek = await fetch("https://cekrek.heirro.dev/api/check", requestOptions)
      if (!cek.ok){throw new Error('opps something went wrong')}

      const res = await cek.json()
      setInfo(res.data)

    } catch (error) {
      setError(error.message)
    }

    setLoad(false)
  }

  let content;
    if (info) {
    content =  <div className='p-2 bg-blue-100 my-5 rounded'>
      <p className='text-green-500 mb-2 text-xs font-semibold'>Success !</p>
      <div>
        <h4 className='font-bold'>Bank/E-Wallet : {info[0].accountBank}</h4>
        <h4 className='font-bold'>Name : {info[0].accountName}</h4>
        <h4 className='font-bold'>Rek/Number : {info[0].accountNumber}</h4>
      </div>
    </div>
  }
  if (info == undefined) {
    content =  <div className='p-2 bg-blue-100 my-5 rounded'>
      <p className='text-red-500 my-2 text-xs'>Data not found !</p>
    </div>
  }
  if (load) {
    const loading = 'animate-bounce w-5 h-5 border-2 rounded-full mx-auto my-5 border-blue-400'
    content = <div className={loading}></div>
  }
  if (error) {
    content = <p className=''>{error}</p>
  }

  const handleSubmit = e => {
    e.preventDefault()

    cekrek(bank, number)
  }

  return <div className={div}>
    <h1 className='font-bold text-lg text-center my-10'>Cek Rekening atau E-Wallet Kalian!</h1>
    <h3 className='font-bold'>List Rekening/E-Wallet Yang Tersedia</h3>

    <div className={div2}>
      {list.map(list => <p className='text-sm' key={list}>{list}</p>)}
    </div>

    <form onSubmit={handleSubmit} className={form}>
      <div className={divForm}>
        <label className={label} htmlFor="bank">Example: bni</label>
        <input className={input} onChange={e => setBank(e.target.value)} required type="text" name="bank" placeholder='Bank Name' />
      </div>

      <div className={divForm}>
        <label className={label} htmlFor="number">Example: 123456789</label>
        <input className={input} onChange={e => setNumber(e.target.value)} required type="number" name="accNumber" placeholder='Account Number' />
      </div>

      <button className={btn} type="submit">Cek!</button>
    </form>

    {content}

  </div>
}

const div  = 'mx-5 md:mx-0'
const div2 = 'grid grid-cols-4 gap-y-2 py-3 mb-5 text-sm'

const form    = 'grid grid-cols-1 md:grid-cols-2 place-items-start gap-5 bg-blue-100 p-2 rounded'
const divForm = 'w-full flex flex-col'
const label   = 'text-xs'
const input   = 'p-1 border-2 border-blue-500 hover:border-white rounded outline-none bg-transparent'
const btn     = 'w-20 text-white bg-blue-400 hover:bg-blue-500 rounded p-1 font-bold outline-none'
