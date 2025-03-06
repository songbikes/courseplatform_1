import ss from "@styles/layout.module.scss";

export function PageHeader
({ title, children } : 
  { title: string, children?: React.ReactNode }) {
  return (
    <div className='container'>
      <h1 className={ss.title}>{title}</h1>
      {children && <div className={ss.pageChild}>{children}</div>}
    </div>
  )
}