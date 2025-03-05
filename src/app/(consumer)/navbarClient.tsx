"use client";
import Link from "next/link";
import { Suspense } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import ss from "./layout.module.scss";

// different from the tutorial as Clerk is client side only and does not have a server side component, somehow it works without the server side component in the tutorial but not in my case
export default function NavbarClient({ hasAdminAccess = false }) {
  return (
    <header>
      <nav className={ss.container}>
        <Link className={ss.link} href="/">
          Web Dev Simplified
        </Link>
        <Suspense>
          <SignedIn>
            {hasAdminAccess && (
              <Link className={ss.link} href="/admin">
                Admin
              </Link>
            )}
            <Link className={ss.link} href="/courses">
              My Courses
            </Link>
            <Link className={ss.link} href="/purchases">
              Purchase History
            </Link>
            <div>
              <UserButton appearance={{
                elements: {
                  userButtonAvatarBox: { width: "100%", height: "100%" },
                }
              }}/>
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
  );
}