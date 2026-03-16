import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    // Check if URI exists
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is missing in .env");
      return NextResponse.json({ certNumber: "442436633516" })
    }

    const db = await getDb()
    const latestDoc = await db.collection("forms")
      .find({})
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray()

    if (!latestDoc || latestDoc.length === 0) {
      return NextResponse.json({ certNumber: "442436633516" })
    }

    return NextResponse.json({ certNumber: latestDoc[0].certNumber })
  } catch (e: any) {
    console.error("DATABASE CONNECTION ERROR:", e.message)
    // Error ki surat mein crash hone ki bajaye ye default number bhejega
    return NextResponse.json({ certNumber: "442436633516" }) 
  }
}