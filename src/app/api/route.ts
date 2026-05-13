export default async function GET() {
    const res = await fetch('https://simple-products-backend-chi.vercel.app/')
    const data = await res.json()

    console.log(data)
}