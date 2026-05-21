'use client'
 
import { signin } from '@/app/actions/auth'
import { useActionState, useEffect } from 'react'
import styles from "./ui.module.css"


 
export default function SigninForm() {
  const [state, action, pending] = useActionState(signin, undefined)
  // let passInput = HTMLInputElement;
  // let image = HTMLImageElement;

  let passInput: HTMLInputElement | null = null;
  let image: HTMLImageElement | null = null;

  useEffect(() => {
    passInput = window?.document.getElementById('password') as HTMLInputElement;
    image = window?.document.getElementById('image') as HTMLImageElement;
  }, [])

  // CODE FOR DISABLING BUTTON (MIGHT BE A MORE DIRECT WAY TO DO THIS WITH HTML FORM)

  // let [emailInputValue, setEmailInputValue] = useState<string | null>(null)
  // let [passInputValue, setPassInputValue] = useState<string | null>(null)
  // let [disableButton, setDisableButton] = useState(true)

  // useEffect(()=> {
  //   if (emailInputValue !== null && passInputValue !== null) {
  //     setDisableButton(false)
  //   }

  // }, [emailInputValue, passInputValue])
  
  // function updateEmailInputValue(e: ChangeEvent<HTMLInputElement>) {
  //   setEmailInputValue(e?.target.value);
  // }

  // function updatePassInputValue() {
    
  // }

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
      {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}
 
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
      <button disabled={pending } type="submit">
        Sign In
      </button>
    </form>
  )
}