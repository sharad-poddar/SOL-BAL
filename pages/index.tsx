import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js'

const Home: NextPage = () => {

  // states for balances and address
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [executables, setExecutables] = useState(false);

  // passing this into another component as prop
  const addressSubmittedHandler = (address: string) => {
    try{
      
      // converting address into an public key
      const key = new PublicKey(address);
      console.log('getting key from address..',key);
      
      // here we deal address as a string so toBase58() to encode address in string
      setAddress(key.toBase58());

      // making connection to solana network DEVNET
      const connection = new Connection(clusterApiUrl('devnet'));
      
      // in this we get balance in SOLANA
      connection.getBalance(key).then(res => {
        console.log(res);
        setBalance(res/LAMPORTS_PER_SOL);
      })


      connection.getAccountInfo(key).then(res =>{
        console.log(res);
        setExecutables(res.executable);
      })

    }catch(error){
      console.log(error);
      alert(error);
    }
  }


  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Solana Journey Begins!! 🌈
        </p>
        {/* refrence of addressSubmittedHandler passed */}
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`is Exectubales are there: ${executables}`}</p>
      </header>
    </div>
  )
}

export default Home
