"use client"

import { useState, useEffect } from "react";
import Head from "next/head";


interface DataItem {
  id: number;
  title: string;
  content: string;
}


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


const Home = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);


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
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  const DisplayItem = ({ item }: { item: DataItem }) => {
    return (
      <li>
        <h2>{item.title}</h2>
        <p>{item.content}</p>
      </li>
    )
  }


  return (
    <div className="">
      <Head>
        <title>Athletic Greens Assignment</title>
      </Head>
      <h1>Athletic Greens Example Page</h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {loading ? <div>loading...</div> :
          <ul>
            {data.map((item) => (
              <DisplayItem key={item.id} item={item} />
            ))}
          </ul>
        }
      </main>
    </div>
  );
};


export default Home;
