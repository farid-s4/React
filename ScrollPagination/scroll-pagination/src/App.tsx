import { useEffect, useState } from "react";

const InfiniteScroll: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const loadData = async (): Promise<void> => {
    setLoading(true);

    await new Promise<void>(resolve => setTimeout(resolve, 1000));

    const newItems: string[] = Array.from({ length: 10 }, (_, i) => {
      return `Элемент ${(page - 1) * 10 + i + 1}`;
    });

    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadData(); 
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (
        scrollTop + windowHeight >= fullHeight - 100 &&
        !loading
      ) {
        loadData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div>
      <h1>Infinite Scroll (TypeScript)</h1>

      {items.map((item, index) => (
        <div
          key={index}
          style={{
            padding: "20px",
            margin: "10px 0",
            background: "#eee"
          }}
        >
          {item}
        </div>
      ))}

      {loading && <p>Загрузка...</p>}
    </div>
  );
};

export default InfiniteScroll;
