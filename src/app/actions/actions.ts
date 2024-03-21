"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const createProduct = async (formData: FormData) => {
  const rawData = {
    name: formData.get("name") as string,
    price: formData.get("price") as string,
    available: formData.get("available") as string,
  };

  // Data mutation
  await sql`
    insert into products (name, price, available) values (${rawData.name}, ${rawData.price}, ${rawData.available});
  `;

  // Revalidate
  revalidatePath("/");
};
