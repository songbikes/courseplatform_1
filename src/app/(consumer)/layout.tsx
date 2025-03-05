import { ReactNode } from "react";
import "../globals.css";
import { getCurrentUser } from "@/services/clerk";
import { canAccessAdminPages } from "@/permissions/general";
import NavbarClient from "./navbarClient";

// import { canAccessAdminPages } from "@/permissions/general"; but I think this could be done in this file maybe but maybe it is better to keep it separate for now
// import NavbarClient from "./navbarClient"; this is the additional component that the tutorial does not have as this goes with this layout component but here we have async function which does not suit client components so I separated them and they are frontend stuff so separation makes them easier to read. This detects whether the user has admin access or not
export default async function ConsumerLayout(
  { children }: 
  Readonly<{ children?: React.ReactNode }>
) {
  //
  let hasAdminAccess = false;
  try {
    const user = await getCurrentUser();
    hasAdminAccess = canAccessAdminPages(user);
  } catch (e) {
    console.error("", e);
  }

  return (
    <>
      <NavbarClient hasAdminAccess={hasAdminAccess} />
      {children}
    </>
  );
}
// "use client";
// import Link from "next/link";
// import { ReactNode, Suspense } from "react";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
// import "../globals.css";
// import ss from "./layout.module.scss";
// import { getCurrentUser } from "@/services/clerk";
// import { canAccessAdminPages } from "@/permissions/general";

// export default function ConsumerLayout(
//   { children }: 
//   Readonly<{ children?: React.ReactNode }>
// ) {
//   return (
//     <>
//       <Navbar />
//       {children}
//     </>
//   )
// }

// function Navbar() {
//   return <header>
//       <nav className={ss.container} >
//         <Link className={ss.link} href="/">
//           Web Dev Simplified
//         </Link>
//         <Suspense>
//           <SignedIn>
//             <AdminLink />
//             <Link className={ss.link} href="/courses">
//               My Courses
//             </Link>
//             <Link className={ss.link} href="/purchases">
//               Purchase History
//             </Link>
//             <div>
//               <UserButton appearance={
//                 {elements: {
//                   userButtonAvatarBox: { width: "100%", height: "100%" },
//                 }}
//               }/>
//             </div>
//           </SignedIn>
//         </Suspense>
//         <Suspense>
//           <SignedOut>
//               <button>
//                 <SignInButton>Sign In</SignInButton>
//               </button>
//           </SignedOut>
//         </Suspense>
//       </nav>
//     </header>
// }

// async function AdminLink() {
//   const user = await getCurrentUser();
//   // if (user.role !== "admin") return null;
//   if (!canAccessAdminPages(user)) return null;
//   return (
//     <Link className={ss.link} href="/admin">
//       Admin
//     </Link>
//   )
// }