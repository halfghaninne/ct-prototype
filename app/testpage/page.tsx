import { Suspense } from "react";
import { cookies } from "next/headers";

async function UserGreeting() {
  const cookieStore = await cookies()
  const user = cookieStore.get('user')?.value || 'oops'
  return <p>Your user id: {user}</p>
}

export default function Instruments() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <UserGreeting/>
        <div>I'm a test page</div>
    </Suspense>
  );
}