import ss from "./layout.module.scss";
export default async function AuthLayout(
  { children }:
  { children: React.ReactNode }
) {
  return <div className={ss.authContainer}>
    {children}
  </div>
}