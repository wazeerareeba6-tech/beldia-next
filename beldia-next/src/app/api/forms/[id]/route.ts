import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(_req: NextRequest,  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const db = await getDb()
    const doc = await db.collection("forms").findOne({ _id: new ObjectId(id) })
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 })
    const { _id, ...rest } = doc as any
    return NextResponse.json({ id: String(_id), ...rest })
  } catch (e: any) {
    console.error("GET /api/forms/:id error:", e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
