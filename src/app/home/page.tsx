import Head from "next/head";
import Image from "next/image";


interface DataItem {
  id: number;
  title: string;
  content: string;
}


// fetch primary data (original content, title text used in UI regardless of updated content)
async function fetchPrimaryData(): Promise<DataItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Mix one scoop of AG1", content: "Original content for item 1" },
        { id: 2, title: "With 8oz of cold water", content: "Original content for item 2" },
        { id: 3, title: "Shake", content: "Original content for item 3" },
        { id: 4, title: "Enjoy the refreshing taste of pineapple and vanilla", content: "Original content for item 4" },
      ]);
    }, 1000);
  });
};

// fetch secondary data (updated content)
async function fetchSecondaryData(): Promise<Partial<DataItem>[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, content: "/images/scoop.webp" },
        { id: 2, content: "/images/mix.webp" },
        { id: 3, content: "/images/shake.webp" },
        { id: 4, content: "/images/enjoy.webp" },
      ]);
    }, 500);
  });
};


// fetch all data, combine into array of DataItems, and set error, loading, and data for use in ui
async function loadData() {
  const [primaryData, secondaryData] = await Promise.all([
    fetchPrimaryData(),
    fetchSecondaryData(),
  ]);

  const secondaryDataMap = new Map(secondaryData.map(item => [item.id, item]));

  const combinedData = primaryData.map(item => ({
    ...item,
    ...secondaryDataMap.get(item.id),
  }));
  return combinedData
};

// Component to display text and image for a single DataItem
const DataItemCard = ({ item }: { item: DataItem }) => {
  return (
    <li>
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-9 xl:aspect-h-16 relative mb-4">
        <Image
          priority
          className="object-cover"
          src={item.content}
          alt={item.title}
          fill
          sizes="(max-width: 1439px) 50vw, 25vw"
        />
      </div>
      <p className="text-lg xl:text-3xl">{item.title}</p>
    </li>
  )
}

// Home page that displays list of <DataItemCard>s
export default async function Home() {
  const data = await loadData()
  return (
    <div className="flex min-h-screen flex-col items-start justify-start p-24">
      <Head>
        <title>Athletic Greens Assignment</title>
      </Head>
      <h1 className="pb-8 lg:pb-12 text-2xl sm:text-3xl md:text-4xl lg:text-6xl">Here&apos;s how AG1 works</h1>
      <main>
        <ul className="grid grid-cols-2 xl:grid-cols-4 gap-8">
          {data.map((item) => (
            <DataItemCard key={item.id} item={item} />
          ))}
        </ul>
      </main>
    </div>
  );
}