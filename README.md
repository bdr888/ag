1. Data fetching performance improvements

- The original code fetched and rendered the data and components on the client. I chose to move that work to the server to speed up performance and not avoid being subject to the client's network connection and device constraints. Using the server components [ has these additional performance benefits ](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#fetching-data-on-the-server).

  - Additionally, I updated the loadData() function that mutates the primary data to use `Promise.all`. This will perform both the primary and secondary fetch operations in parallel instead of sequentially, reducing time needed to get and then display all the data together.

  - Finally, I reduced the time complexity of the algorithm by first creating a map of the secondary data, then using `Array.get` to retrieve the corresponding item (the updated content).

Depending on constraints, in a real world situation I might try to do this work on the server so we aren't at the mercy of a user's internet connection or device...TODO explain this more...

2. UI improvements
   Loading - set react loading state in load data function so we can use in the ui
   Handle error - same as loading

3. Images
   Added images
   Displayed responsively in reusable component
   retained original content data in case, added imageurl to dataitem type

4.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
