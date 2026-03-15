"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useT } from "@/components/language-provider"

type FormState = {
  trust: string
  municipality: string
  idNumber: string
  name: string
  nationality: string
  sex: "male" | "female" | ""
  profession: string
  certNumber: string
  issueDateG: string
  issueDateH: string
  expiryDateG: string
  expiryDateH: string
  eduProgramType: string
  eduProgramEndH: string
  facilityName: string
  licenseNumber: string
  facilityNumber: string
  photo?: File | null
}

export function HealthForm() {
  const t = useT()
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<FormState>({
    trust: "",
    municipality: "",
    name: "",
    idNumber: "",
    sex: "",
    nationality: "",
    certNumber: "",
    profession: "",
    issueDateH: "",
    issueDateG: "",
    expiryDateH: "",
    expiryDateG: "",
    eduProgramType: "",
    eduProgramEndH: "",
    licenseNumber: "",
    facilityName: "",
    facilityNumber: "",
    photo: null,
  })

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    setForm((prev) => ({ ...prev, photo: f }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (k === "photo") return
        fd.append(k, String(v ?? ""))
      })
      if (form.photo) fd.append("photo", form.photo)

      const res = await fetch("/api/forms", { method: "POST", body: fd })
      if (!res.ok) throw new Error("Failed to submit")

      const data = await res.json()
      router.push(`/submitted/${data.id}`)
    } catch (err) {
      console.error("Submit error:", err)
      alert("Submission failed")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="form-box mx-auto max-w-6xl p-8 bg-white shadow-sm border border-gray-300 rounded-md mt-6">
      <h2 className="form-title">{t("healthCertificate")}</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {(
          [
            ["trust", t("trust")],
            ["municipality", t("municipality")],
            ["name", t("name")],
            ["idNumber", t("idNumber")],
            ["sex", t("sex")],
            ["nationality", t("nationality")],
            ["certNumber", t("certNumber")],
            ["profession", t("profession")],
            ["issueDateH", t("issueDateH")],
            ["issueDateG", t("issueDateG")],
            ["expiryDateH", t("expiryDateH")],
            ["expiryDateG", t("expiryDateG")],
            ["eduProgramType", t("eduProgramType")],
            ["eduProgramEndH", t("eduProgramEndH")],
            ["licenseNumber", t("licenseNumber")],
            ["facilityName", t("facilityName")],
            ["facilityNumber", t("facilityNumber")],
          ] as [keyof FormState, string][]
        ).map(([key, label]) => (
          key === "sex" ? (
  <div key={key} className="form-field">
    <label className="form-label">{label}</label>
    <select
      className="form-input"
      value={form.sex}
      onChange={onChange("sex")}
      required
    >
      <option value="">{t("select")}</option>
      <option value={t("male")}>{t("male")}</option>
      <option value={t("female")}>{t("female")}</option>
    </select>
  </div>
) : (
  <div key={key} className="form-field">
    <label className="form-label">{label}</label>
    <input
      className="form-input"
      type={key === "issueDateG" || key === "expiryDateG" ? "date" : "text"}
      value={form[key] as string}
      onChange={onChange(key)}
      required
    />
  </div>
)   
))}

        <div className="form-field">
          <label className="form-label">{t("photo")}</label>
          <input
            type="file"
            accept="image/*"
            onChange={onFile}
            className="form-input cursor-pointer"
            required
          />
        </div>
      </div>

      <div className="flex justify-center pt-5">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-[#006D6F] px-6 py-2 text-white font-medium shadow hover:bg-[#00575A] transition disabled:opacity-50 cursor-pointer"
        >
          {submitting ? t("uploading") : t("Create Client")}
        </button>
      </div>
    </form>
  )
}
