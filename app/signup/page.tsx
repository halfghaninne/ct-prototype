'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
import styles from "./ui.module.css"

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
 
  return (
    <form className={styles.center} action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
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