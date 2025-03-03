This project is following this tutorial on YouTube: https://youtu.be/OAyQ3Wyyzfg?si=T7nWFbUx2lWS85Rr

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Schema Design:
This schema design creates a flexible, scalable system for managing courses, tracking user progress, and handling purchases. The relationships enable complex queries while maintaining data integrity.

Maintainance:
Separation of Tables and Relationships. Defining tables first, then relationships separately. This pattern makes the code more readable and maintainable.
Splitting schemas into separate files by entity type (course.ts, user.ts, etc.)
Central export point in schema.ts

Basic Structure:
Products: are the top-level sellable items
Courses: are included in products
Sections: organize course content
Lessons: are the actual educational content

Many-to-Many Relationships using join tables:
CourseProductTable: Links courses to products
UserCourseAccessTable: Tracks user access to courses
UserLessonCompleteTable: Records completed lessons
They have composite primary keys

Database Schema Best Practices:
Soft Deletes: Using deletedAt timestamps instead of removing records
Audit Fields: Including createdAt and updatedAt on all tables
Enums: Using constrained values for statuses (public, private, etc.)
Composite Primary Keys: For junction tables
Referential Integrity: Using proper foreign key constraints with cascade options

UUID Primary Keys:
Using UUIDs instead of auto-incrementing integers for security and distribution benefits.
UUID (Universally Unique Identifier) is a 128-bit identifier that's designed to be globally unique.
Format: Typically represented as 32 hexadecimal characters with hyphens (e.g., 123e4567-e89b-12d3-a456-426614174000)
Advantages:
Globally unique: Generated independently without coordination
No sequential pattern: More secure than sequential IDs
Distributed systems friendly: Multiple servers can generate IDs without conflicts
No information disclosure: Can't guess the next ID or total records

Best Practice Context
While UUIDs are one part of a comprehensive security approach that should also include:

1. Proper authentication and authorization
2. Input validation
3. API rate limiting
4. HTTPS for all communications
5. Security headers
6. Regular security audits

Drizzle ORM Implementation:
Table Definition Pattern:
export const TableName = pgTable("table_name", {
// columns
},
// Table modifiers (like primary key)
);

Relationship Pattern:
export const TableRelationships = relations(
TableName,
({ one, many }) => ({
//Define relationships
})
)

Helper Functions:
Reusable schema functions

Integration with External Services:

1. Clerk Integration
   Using clerkUserId in the UserTable to link with Clerk authentication
   Storing basic user information locally for performance
2. Stripe Integration
   PurchaseTable handles transactions with Stripe
   stripeSessionId links to Stripe's payment sessions
   pricePaidInCents avoids floating-point issues

JSON storage of product details ensures historical accuracy:
Schema Design Decisions

1. Content Access Control
   Status enums (public, private, preview) control visibility
   UserCourseAccessTable determines which users can access which courses
2. Content Organization
   order fields in LessonTable and CourseSectionTable allow manual sorting
   Hierarchical structure allows flexible content organization
3. Data Integrity Rules
   onDelete: "cascade" automatically removes dependent records
   onDelete: "restrict" prevents deletion when dependencies exist
   Unique constraints on important identifiers

Docker & Drizzle:
I followed the tutorial and can do "npm run db:generate" but the rest is not working as video shows, so I watched this tutorial: https://youtu.be/bw-bMhlhcpg?si=CcP1he3dHTo9OZEb following the steps activating WSL, and other stuff. And then I opened Docker as "Run as Adminsstrator" and skipped all setup. And I opened the Admin terminal again typed in "docker compose up" then it works. and then I go back to VSCode type in "npm run db:migrate" and then it works and "npm run db:studio", I see the tables all in there in Drizzle.
