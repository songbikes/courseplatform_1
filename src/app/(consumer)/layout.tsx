"use client";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import "../globals.css";
import ss from "./layout.module.scss";

export default function ConsumerLayout(
  { children }: 
  Readonly<{ children?: React.ReactNode }>
) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

function Navbar() {
  return <header>
      <nav className={ss.container} >
        <Link className={ss.link} href="/">
          Web Dev Simplified
        </Link>
        <Suspense>
          <SignedIn>
            <Link className={ss.link} href="/admin">
              Admin
            </Link>
            <Link className={ss.link} href="/courses">
              My Courses
            </Link>
            <Link className={ss.link} href="/purchases">
              Purchase History
            </Link>
            <div>
              <UserButton appearance={
                {elements: {
                  userButtonAvatarBox: { width: "100%", height: "100%" },
                }}
              }/>
            </div>
          </SignedIn>
        </Suspense>
        <Suspense>
          <SignedOut>
              <button>
                <SignInButton>Sign In</SignInButton>
              </button>
          </SignedOut>
        </Suspense>
      </nav>
    </header>
}