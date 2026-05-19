'use client'

import Link from "next/link";
import { signout } from "../actions/auth";
// import { createClient } from "../utils/supabase/client";

export default function UserHeader({user}: {user: Boolean}) {
    // const supabaseClient = createClient();
    // const {data, error} = await supabaseClient.auth.getSession()
    // console.log(data?.session?.user)



    // if (lazyAuthCheck.length === 1) {
    //     user = true;
    // }

    return (
        <div>
            { user ? <Link href='/' onNavigate={(e) => {signout();}}>Sign Out</Link> : <Link href="/signin">Sign In</Link>}
        </div>
    )
}