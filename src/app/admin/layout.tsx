// "use client";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import { UserButton } from "@clerk/nextjs";
import ss from "@styles/layout.module.scss";
import { ClerkProvider } from "@clerk/nextjs";
// import { getCurrentUser } from "@/services/clerk";
// import { canAccessAdminPages } from "@/permissions/general";

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
  return (
      <header>
        <nav className={ss.container} >
          <Link className={ss.link} href="/">
            Web Dev Simplified
          </Link>
          <div>
            Admin
          </div>
          <Suspense>
  
              <Link className={ss.link} href="/admin/courses">
                Courses
              </Link>
              <Link className={ss.link} href="/admin/products">
                Products
              </Link>
              <Link className={ss.link} href="/admin/sales">
                Sales
              </Link>
              <div>
                <UserButton appearance={
                  {elements: {
                    userButtonAvatarBox: { width: "50%", height: "50%" },
                  }}
                }/>
              </div>
  
          </Suspense>
        </nav>
      </header>
  )
}
