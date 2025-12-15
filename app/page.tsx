import Footer from "./components/Footer";
import Header from "./components/Header";

export default async function Home() {
  const categoryRes = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!categoryRes.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await categoryRes.json();

  return (
    <div>
      <main>
        <Header />
        <div>
          {categories.map((cat: { name: string }) => (
            <div key={cat.name}>
              <h2>{cat.name}</h2>
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}
