import { ProductCard } from "@/products";
import { products } from "@/products/data/products";

export default function NamePage() {
  const myProducts = products;
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 justify-items-center">
      {myProducts.map((products) => (
        <ProductCard key={products.id} {...products} />
      ))}
    </div>
  );
}
