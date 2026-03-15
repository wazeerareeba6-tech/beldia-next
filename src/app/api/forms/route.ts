import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { cloudinary } from "@/lib/cloudinary"
import { Readable } from "stream"

// Helper: convert Web File to Buffer
async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const data: any = {}
    for (const [key, value] of formData.entries()) {
      if (key === "photo") continue
      data[key] = String(value)
    }
    let photoUrl: string | null = null
    const maybeFile = formData.get("photo")
    if (maybeFile && maybeFile instanceof File && maybeFile.size > 0) {
      if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 })
      }
      const buffer = await fileToBuffer(maybeFile)
      photoUrl = await new Promise<string>((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream({ folder: "health-certificates" }, (err, result) => {
          if (err || !result) return reject(err || new Error("Upload failed"))
          resolve(result.secure_url)
        })
        Readable.from(buffer).pipe(upload)
      })
    }

    data.photoUrl = photoUrl
    data.createdAt = new Date()

    const db = await getDb()
    const res = await db.collection("forms").insertOne(data)

    return NextResponse.json({ id: String(res.insertedId) }, { status: 201 })
  } catch (e: any) {
    console.error("POST /api/forms error:", e)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}