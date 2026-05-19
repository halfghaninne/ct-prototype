import { SignupFormSchema, FormState } from '@/app/lib/definitions'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!)
// ---cut---
async function signUpNewUser(email:string, password:string) {
  await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: 'https://example.com/welcome',
    },
  })
  // const { data, error } = await supabase.auth.signUp({
  //   email: email,
  //   password: password,
  //   options: {
  //     emailRedirectTo: 'https://example.com/welcome',
  //   },
  // })
  // return {data, error}
}

async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  console.log(data);
  if (error) {
    console.log(error);
  } else {
    redirect('/instruments/');
  }
}

export async function signin(state: FormState, formData: FormData) {
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  //TODO validation (follow example below)
  //const hashedPassword = await bcrypt.hash(password, 10)

  signInWithEmail(email, password);
}
 
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  const { email, password } = validatedFields.data

 
  // 3. Insert the user into the database or call an Auth Library's API
  // const {data, error} = await signUpNewUser(email, password);
  signUpNewUser(email, password);
 
  
  // TODO redirect to signin with a message to confirm email
  redirect('/signin/');
}