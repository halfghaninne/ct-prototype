'use client'

import { lazy } from "react";

export default function UserHeader() {
    const lazyAuthCheck = Object.keys(localStorage).filter((key: string) =>
    key.endsWith("-auth-token"));

    let user = false;

    if (lazyAuthCheck.length === 1) {
        user = true;
    }

    return (
        <div>
            { user ? "Sign Out" : "Sign In"}
        </div>
    )
}