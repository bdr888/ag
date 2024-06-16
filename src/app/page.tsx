"use client"

import { useState, useEffect } from "react";
import Head from "next/head";
import Loading from "@/components/Loading";
import Error from "@/components/Error";


interface DataItem {
  id: number;
  title: string;
  content: string;
}


// fetch primary text data
const fetchPrimaryData = async (): Promise<DataItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Mix one scoop of AG1", content: "Original content for item 1" },
        { id: 2, title: "Mix one scoop of AG1 2", content: "Original content for item 2" },
        { id: 3, title: "Shake", content: "Original content for item 3" },
        { id: 4, title: "Enjoy the refreshing taste of pineapple and vanilla", content: "Original content for item 4" },
      ]);
    }, 1000);
  });
};

// fetch secondary image data
const fetchSecondaryData = async (): Promise<Partial<DataItem>[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, content: "Updated content for item 1" },
        { id: 2, content: "Updated content for item 2" },
        { id: 3, content: "Updated content for item 3" },
        { id: 4, content: "Updated content for item 4" },
      ]);
    }, 500);
  });
};

// Component to display a single combined text and image data
const DisplayItem = ({ item }: { item: DataItem }) => {
  return (
    <li>
      <h2>{item.title}</h2>
      <p>{item.content}</p>
    </li>
  )
}

// Home page that displays list of <DataItem>s
const Home = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    const loadData = async () => {
      try {
        const [primaryData, secondaryData] = await Promise.all([
          fetchPrimaryData(),
          fetchSecondaryData(),
        ]);

        const combinedData = primaryData.map((item) => {
          const secondaryItem = secondaryData.find(
            (secItem) => secItem.id === item.id
          );
          return { ...item, ...secondaryItem };
        });

        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true)
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="">
      <Head>
        <title>Athletic Greens Assignment</title>
      </Head>
      <h1>Athletic Greens Example Page</h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {error && <Error />}
        {loading && <Loading />}
        {!loading && !error && (
          <ul>
            {data.map((item) => (
              <DisplayItem key={item.id} item={item} />
            ))}
          </ul>)}
      </main>
    </div>
  );
};


export default Home