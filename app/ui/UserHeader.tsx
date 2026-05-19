'use client'

import Link from "next/link";
import { signout } from "../actions/auth";

export default function UserHeader({user}: {user: Boolean}) {

    return (
        <div>
            { user ? <Link href='/' onNavigate={(e) => {signout();}}>Sign Out</Link> : <Link href="/signin">Sign In</Link>}
        </div>
    )
}