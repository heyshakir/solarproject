# Backend Implementation Plan: Solar Website

This plan outlines the steps to build a robust, secure, and complete backend for your Next.js application using Server Actions and Prisma.

## Goal Description
Transform the current basic backend setup into a fully functional, secure, and production-ready system. This includes securing authentication, implementing complete CRUD (Create, Read, Update, Delete) for Posts and Categories, and adding input validation.

## User Review Required
> [!WARNING]
> **Security Critical**: The current authentication uses plain-text passwords. We MUST switch to password hashing (e.g., `bcryptjs`) immediately. This will invalidate existing users in the database (you will need to re-seed).

## Proposed Architecture

-   **Database**: SQLite (via Prisma)
-   **ORM**: Prisma
-   **Authentication**: NextAuth v5 (Credentials Provider with Hashing)
-   **API Layer**: Next.js Server Actions (`lib/actions.ts`)
-   **Validation**: Zod (for type-safe schema validation)

## Implementation Steps

### Phase 1: Security & Foundation
1.  **Install Dependencies**: Add `bcryptjs` for hashing and `zod` for validation.
2.  **Update User Model**: Ensure schema supports necessary fields.
3.  **Secure Auth**:
    -   Modify `auth.ts` to use `bcrypt.compare`.
    -   Update `prisma/seed.ts` to hash passwords before inserting.
4.  **Input Validation**: Create a `lib/definitions.ts` file to define Zod schemas for User, Post, and Category.

### Phase 2: Category Management (New)
*Currently, there are no actions to manage categories.*
1.  **Create Server Actions**:
    -   `createCategory`
    -   `updateCategory`
    -   `deleteCategory`
2.  **Frontend Integration**: Connect these actions to the Category Management forms in the Admin Dashboard.

### Phase 3: Post Management (Enhancement)
*Current `createPost` and `deletePost` exist but lack validation and updates.*
1.  **Enhance Actions**:
    -   Update `createPost` to use Zod validation.
    -   Create `updatePost` action (for editing blogs).
    -   Add `revalidatePath` to ensure cache is refreshed after changes.
2.  **Slug Generation**: Ensure unique slugs are generated reliably.

## Detailed File Changes

### [lib]
#### [NEW] [definitions.ts](file:///c:/Users/SHAKIR/Desktop/solar%20website/lib/definitions.ts)
-   Define Zod schemas: `SignupForm`, `PostForm`, `CategoryForm`.

#### [MODIFY] [actions.ts](file:///c:/Users/SHAKIR/Desktop/solar%20website/lib/actions.ts)
-   Import Zod schemas.
-   Add `updatePost`, `createCategory`, `updateCategory`, `deleteCategory`.
-   Implement `bcrypt` for password updates (if added).

#### [MODIFY] [auth.ts](file:///c:/Users/SHAKIR/Desktop/solar%20website/auth.ts)
-   Replace plain text comparison with `bcrypt.compare`.

### [prisma]
#### [MODIFY] [seed.ts](file:///c:/Users/SHAKIR/Desktop/solar%20website/prisma/seed.ts)
-   Use `bcrypt.hash` for creating the initial admin user.
