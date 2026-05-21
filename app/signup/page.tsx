'use client'

import { signup } from '@/app/actions/auth'
import { useActionState, useEffect } from 'react'
import styles from "./ui.module.css"

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  let passInput: HTMLInputElement | null = null;
    let image: HTMLImageElement | null = null;
  
    useEffect(() => {
      passInput = window?.document.getElementById('password') as HTMLInputElement;
      image = window?.document.getElementById('image') as HTMLImageElement;
    }, [])

  function toggleImage() {
  if (passInput && image) {
  if (image.src.endsWith('/eye-show.svg')) {
    passInput.type = 'text';
    image.src = '/eye-hide.svg';
  } else {
    passInput.type = 'password';
    image.src = '/eye-show.svg';
  }   
  }
  }
 
  return (
    <form className={styles.center} action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input className={styles.input} id="email" name="email" placeholder="user@example.com" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div>
        <label htmlFor="password">Password</label>
        <input className={styles.input} id="password" name="password" type="password" />
        <img
          id="image"
          onClick={() => toggleImage()}
          style={{color: 'white', height: '25px', display: 'inline-block', filter: 'brightness(0) invert(1)'}}
          src="/eye-show.svg" 
        />
        
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul style={{color: 'yellow'}}>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  )
}