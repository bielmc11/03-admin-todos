import { WidgetItem } from "@/components";
import { products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart/components/CartItems";
import { get } from "http";
import { cookies } from "next/headers";

interface objetoType {
  [id: string]: number;
}
export default function CartPage() {
  const cookiesStore = cookies();
  const cart: objetoType = JSON.parse(cookiesStore.get("cart")?.value ?? "{}");

  const getCardProducts = () => {
    const myProucts = products.filter((item) => {
      return Object.keys(cart).includes(item.id);
    });
    return myProucts;
  };

  const totalToPay = getCardProducts().reduce((prev, current) => {
    return prev + current.price * cart[current.id];
  }, 0)

 const addTaxes = (price: number) => {
    return (price * 1.15).toFixed(2);
  }
  console.log("La lista de productos es", getCardProducts());

  return (
    <div>
      <h1 className="text-3xl">Productos en el carrito</h1>
        <hr />
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 grow">
          {getCardProducts().length === 0 && (
            <div>No tienes productos en el carrito</div>
          )}
          {getCardProducts().map((item) => {
            return (
              <ItemCard key={item.id} product={item} quantity={cart[item.id]} />
            );
          })}
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-4/12">
          <WidgetItem title="Toal a pagar">
            <div className="mt-2 flex justify-center gap-2 font-bold">
                <h3> ${ totalToPay }</h3>
    
            </div>
            <span className="font-bold">Impuestos 15%: $ { addTaxes(totalToPay) }</span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
