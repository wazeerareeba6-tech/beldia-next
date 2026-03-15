// src/app/api/latest-cert/route.ts
import { NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDb()
    // Sabse latest form entry uthayenge
    const latestDoc = await db.collection("forms")
      .find({})
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray()

    if (!latestDoc || latestDoc.length === 0) {
      return NextResponse.json({ certNumber: "442436633516" }) // Default placeholder
    }

    return NextResponse.json({ certNumber: latestDoc[0].certNumber })
  } catch (e) {
    return NextResponse.json({ certNumber: "442436633516" }, { status: 500 })
  }
}