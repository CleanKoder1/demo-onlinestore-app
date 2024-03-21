import { sql, db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const client = await db.connect();

  const { rows: products } = await client.sql`
    select * from products;
    `;

  return NextResponse.json({ products });
}
