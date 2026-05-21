'use client'
 
import { signin } from '@/app/actions/auth'
import { useActionState } from 'react'
import styles from "./ui.module.css"


 
export default function SigninForm() {
  const [state, action, pending] = useActionState(signin, undefined)
  // let passInput = HTMLInputElement;
  // let image = HTMLImageElement;
  if (typeof window !== 'undefined') {
    const passInput = document.getElementById('password') as HTMLInputElement;
    const image = document.getElementById('image') as HTMLImageElement;

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
  }
  
  return (
    <form className={styles.center} action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input className={styles.input} id="email" name="email" placeholder="Email" />
      </div>
      {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}
 
      <div>
        <label htmlFor="password">Password</label>
        <input className={styles.input} id="password" name="password" type="password" />
        <img
          id="image"
          onClick={() => toggleImage()}
          style={{color: 'white', height: '25px', display: 'inline-block'}}
          src="/eye-show.svg" 
        />
      </div>
      {/* {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )} */}
      <button disabled={pending} type="submit">
        Sign In
      </button>
    </form>
  )
}