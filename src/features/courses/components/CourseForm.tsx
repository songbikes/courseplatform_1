"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseSchema } from "../schema/courseSchema";
import type { z } from "zod";
import ss from "@styles/layout.module.scss";

export function CourseForm() {
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: { 
      name: "", 
      description: "" 
    },
  })
  
  function onSubmit(values: z.infer<typeof courseSchema>) {
    console.log(values);
  }

  return (
    <form className={ss.form} onSubmit={form.handleSubmit(onSubmit)}>
      <h2 className={ss.title}>Create a class</h2>
      
      <div className={ss.formGroup}>
        <label htmlFor="name" className={ss.label}>Class Name</label>
        <input
          id="name"
          type="text"
          className={ss.input}
          placeholder="Enter class name"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className={ss.errorText}>{form.formState.errors.name.message}</p>
        )}
      </div>
      
      <div className={ss.formGroup}>
        <label htmlFor="description" className={ss.label}>Descripion</label>
        <textarea
          id="description"
          className={ss.textarea}
          placeholder="Enter class description"
          rows={5}
          {...form.register("description")}
        ></textarea>
        {form.formState.errors.description && (
          <p className={ss.errorText}>{form.formState.errors.description.message}</p>
        )}
      </div>
      
      <button type="submit" className={ss.submitButton}>
        Create
      </button>
    </form>
  );
}