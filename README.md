# [SpaceDrive](https://storage.myitscm.com)

This is an open source oneline personal storage web application backed with OneDrive and build with everything new in Next.js 14.

> **Warning**
> This project is still in development and you can use it but some bugs may occur (less probability)

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Table:** [TanStack Table](https://tanstack.com/table)

## Features included (to be stable and implement)
- [ ] Search function, include filter file name and search all items in drive
- [ ] File listing with tanstack-react-table
- [ ] Actions features include upload, delete, create and rename
- [ ] Preview File Features
- [X] Theming includes dark and light
- [ ] File and Folder Icons
- [ ] Context Menu (maybe not a good idea)
- [X] Sorting features for each column
- [ ] Date based on client side timezone
- [ ] Internationalize (translations)

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/xXQiuChenXx/onedrive-index.git
   ```

2. Install dependencies using pnpm

   ```bash
   pnpm install
   ```

3. Copy the `.env.example` to `.env`

   ```bash
   cp .env.example .env
   ```

4. update the environment variables in `.env`, configurations files in `config/api.config.ts` and `config/site.config.ts`

5. Push the database schema

   ```bash
   pnpm run db:push
   ```

6. Start the development server

   ```bash
   pnpm run dev
   ```


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.


## License
[MIT](https://github.com/xXQiuChenXx/onedrive-index/blob/master/LICENSE)
@2024 [TaiHong](https://taihong.myitscm.com)
