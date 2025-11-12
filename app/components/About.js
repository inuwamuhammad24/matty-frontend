import React from "react"
import { Link } from "react-router-dom"
import { Info, Mail, AlertTriangle, Code2, Phone } from "lucide-react"

export default function About({ darkMode }) {
  return (
    <div className={`min-h-screen w-full px-6 py-10 ${darkMode ? "bg-[#1b1b1d] text-[#e8eaed]" : "bg-[#fff] text-[#444]"}`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Info className="text-[#7cb3f3]" size={28} />
          <h1 className="text-3xl font-semibold">About Matty</h1>
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <p className="leading-relaxed text-lg">
            <strong>Matty</strong> is your intelligent <span className="text-[#7cb3f3] font-medium">University of Jos (UNIJOS)</span> Virtual Assistant — designed to make it easier for students, staff, and visitors to access university-related information anytime, anywhere.
          </p>
        </section>

        {/* What Matty Can Do */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">🎯 What Matty Can Do</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Answer common UNIJOS-related questions (admissions, departments, fees, etc.)</li>
            <li>Provide academic schedules, deadlines, and campus news</li>
            <li>Guide new students on registration and clearance procedures</li>
            <li>Offer quick links to official university resources</li>
            <li>Available 24/7 — always ready to assist you</li>
          </ul>
        </section>

        {/* How It Works */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">⚙️ How It Works</h2>
          <p className="leading-relaxed">
            Matty uses <strong>Artificial Intelligence (AI)</strong> and <strong>Natural Language Processing (NLP)</strong> to understand your questions and generate helpful, conversational responses. It’s powered by modern technologies like <span className="font-medium text-[#7cb3f3]">React</span>, <span className="font-medium text-[#7cb3f3]">Node.js</span>, <span className="font-medium text-[#7cb3f3]">Tailwind CSS</span>, and <span className="font-medium text-[#7cb3f3]">Hugging Face AI models</span>, securely hosted on <span className="font-medium text-[#7cb3f3]">Koyeb</span> and <span className="font-medium text-[#7cb3f3]">Netlify</span>.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-8 bg-[#7cb3f3]/10 border-l-4 border-[#7cb3f3] p-4 rounded-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-[#7cb3f3] mt-1" />
            <div>
              <h3 className="font-semibold">Disclaimer</h3>
              <p className="text-sm mt-1 leading-relaxed">
                Matty aims to provide accurate information, but responses may occasionally be incomplete or outdated. Always confirm official details through the <strong>University of Jos</strong> website or relevant departments.
              </p>
            </div>
          </div>
        </section>

        {/* Developer Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">👨‍💻 Developers</h2>
          <p>
            Developed by <span className="font-medium text-[#7cb3f3]">Students</span>, at the Computer Science department University of Jos, who are passionate about AI and technology for education.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <Mail className="text-[#7cb3f3]" size={18} />
            <a href="mailto:inuwamuhammad24@gmail.com" className="text-[#7cb3f3] hover:underline">
              inuwamuhammad24@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <Phone className="text-[#7cb3f3]" size={18} />
            <a href="#" className="text-[#7cb3f3] hover:underline">
              +2349 07882 2087
            </a>
          </div>
        </section>

        {/* Version Info */}
        <section className="mb-10">
          <div className="flex items-center gap-3">
            <Code2 className="text-[#7cb3f3]" />
            <p className="text-sm">
              <strong>Version:</strong> 1.0 — <strong>Last Updated:</strong> November 2025
            </p>
          </div>
          <ul className="list-disc pl-6 mt-2 text-sm space-y-1">
            <li>Upcoming: Voice interaction and personalized student dashboard</li>
          </ul>
        </section>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <Link to="/" className={`px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300 ${darkMode ? "bg-[#7cb3f3] text-black hover:bg-[#a7c8f9]" : "bg-[#2a2a2a] text-white hover:bg-[#7cb3f3]"}`}>
            💬 Back to Chat
          </Link>
        </div>
      </div>
    </div>
  )
}
