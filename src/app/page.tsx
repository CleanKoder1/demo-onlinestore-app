import { createProduct } from "./actions/actions"
import { TProduct } from "./types/types"

async function getProducts() {
  const fetchData = await fetch(`http://localhost:3000/api/products`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  const res = await fetchData.json()

  return res

}

export default async function Home() {
  const { products }: { products: Array<TProduct> } = await getProducts()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-3">
      <form action={createProduct} className="flex flex-col gap-3 justify-center items-center p-3 w-1/2 min-h-14 h-auto border rounded-sm">
        <h1 className="font-bold text-xl text-black">Inserta tus productos</h1>
        <input type="text" placeholder="Nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="name" />
        <input type="number" placeholder="Precio" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="price" />
        <div className="flex gap-2 self-start">
          <label htmlFor="available">Estara disponible?</label>
          <input type="checkbox" name="available" id="available" />
        </div>
        <button className="w-full p-3 bg-green-600 text-white font-bold text-sm rounded-sm">Enviar informacion</button>
      </form>
      <ul className="w-auto min-h-14 h-auto border rounded-sm flex flex-col gap-3 justify-center items-center p-3">
        {products && products.map((product: TProduct) => (<li className="font-bold" key={product.id}>{product.name} -  {product.price} - Disponible? - {product.available ? "Si" : "No"}</li>))}
      </ul>
    </main>
  );
}
