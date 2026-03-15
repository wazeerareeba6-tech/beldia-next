"use client"

import Image from "next/image"
import visionLogo from "@/assets/vision-2030.png"
import { useT, useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { lang } = useLanguage()
  const t = useT()

  return (
    <footer
      className={`w-full border-t md:py-2 border-gray-200 bg-white text-gray-900 ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
    >
      <div className="hidden mx-auto md:flex max-w-7xl flex-col md:flex-row items-center justify-between gap-3 px-6 py-4 text-sm">
        {/* Left side - Logo & Ministry Text */}
        <div
          className={`flex items-center ${
            lang === "ar" ? "md:order-1" : "md:order-2"
          }`}
        >
          <Image
            src={visionLogo}
            alt="Vision 2030"
            width={60}
            height={60}
            className={`${lang === "ar" ? "ml-2" : "mr-2"} object-contain`}
          />
          <span className="whitespace-nowrap mx-4">
            © 2025 {lang === "ar" ? "وزارة البلديات والإسكان" : "Ministry of Municipal and Rural Affairs & Housing"}
          </span>
        </div>

        {/* Right side - Links */}
        <ul
          className={`flex flex-wrap items-center justify-center gap-5 ${
            lang === "ar" ? "md:order-1" : "md:order-2"
          }`}
        >
          <li className="cursor-pointer hover:underline">
            {lang === "ar" ? "اتصل بنا" : "Contact Us"}
          </li>
          <li className="cursor-pointer hover:underline">
            {lang === "ar" ? "شروط الاستخدام" : "Terms of Use"}
          </li>
          <li className="cursor-pointer hover:underline">
            {lang === "ar" ? "خريطة الموقع" : "Site Map"}
          </li>
        </ul>
      </div>

      {/* Mobile layout: stacked center */}
      <div className="md:hidden text-xs flex flex-col py-2 items-center text-center space-y-2 pb-4">
        <Image src={visionLogo} alt="Vision 2030" width={60} height={60} />
        <p>
          © 2025 {lang === "ar" ? "وزارة البلديات والإسكان" : "Ministry of Municipal and Rural Affairs & Housing"}
        </p>
        <div className="flex space-x-4 rtl:space-x-reverse">
          <span className="cursor-pointer hover:underline">
            {lang === "ar" ? "اتصل بنا" : "Contact Us"}
          </span>
          <span className="cursor-pointer hover:underline">
            {lang === "ar" ? "شروط الاستخدام" : "Terms of Use"}
          </span>
          <span className="cursor-pointer mr-3 hover:underline">
            {lang === "ar" ? "خريطة الموقع" : "Site Map"}
          </span>
        </div>
      </div>
    </footer>
  )
}
