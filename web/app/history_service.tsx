export interface Item {
  id: number;
  address: string;
  body: string;
  method: string;
  created_at: string;
}

const URI = `http://localhost:8090/history`

export default async function getItems() {
  const res = await fetch(URI)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
