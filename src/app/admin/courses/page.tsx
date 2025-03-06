import ss from "@styles/layout.module.scss";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div>
      <PageHeader title='Courses'>
        <button className={ss.newCourseButton}>
          <Link className={ss.Link} href='/admin/courses/new'>
            New Course
          </Link>
        </button>
      </PageHeader>
    </div>
  )
}``