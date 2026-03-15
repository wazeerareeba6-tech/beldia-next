"use client"

import { HealthForm } from "@/components/health-form"
import { Nav } from "@/components/nav";

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Nav />
      <HealthForm />
    </main>
  )
}
