# [Space Drive](https://storage.myitscm.com)

This is an open source online personal storage web application backed with OneDrive Graph API and build with everything new in Next.js 14.

> **Warning**
> This project is still in development and you can use it but some bugs may occur (less probability).

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
- [ ] Use password to protect route
- [X] Only authorized user can modify the files.

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


## Deploy the application

You can easily deploy the app to following platform by clicking deploy button below

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FxXQiuChenXx%2Fspacedrive&env=CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,POSTGRES_URL,POSTGRES_URL_NON_POOLING,NEXT_PUBLIC_URL,SECRET_KEY&project-name=spacedrive&repository-name=spacedrive)

## Contributing
Contributions are welcome! Please open an issue if you have any questions or suggestions. Your contributions will be acknowledged. See the [contributing guide](./CONTRIBUTING.md) for more information.

## License
[MIT](https://github.com/xXQiuChenXx/onedrive-index/blob/master/LICENSE)

@2024 [TaiHong](https://taihong.myitscm.com)
