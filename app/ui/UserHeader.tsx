'use client'

import Link from "next/link";
import { signout } from "../actions/auth";
import styles from './ui.module.css';

export default function UserHeader({user}: {user: Boolean}) {

    return (
        <div className={styles.headerFlex}>
            <Link href='/'>Home</Link>
            { user ? 
                <Link href='/' onNavigate={(e) => {signout();}}>Sign Out</Link> : 
                <div><Link href="/signin">Sign In</Link><span style={{margin: '8px'}}/>/<span style={{margin: '8px'}}/><Link href="/signup">Sign Up</Link></div>
            }
        </div>
    )
}