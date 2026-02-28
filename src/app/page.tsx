import VisaTracker from "@/components/VisaTracker";
import { studentVisaSteps, dependentVisaSteps } from "@/lib/visaData";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-950/30 to-gray-900 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🇳🇿</span>
            <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
              New Zealand Immigration
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Student Visa Tracker
          </h1>
          <p className="text-gray-400 mt-2 text-base max-w-xl">
            Track your NZ student visa application and dependent visa process step by step.
            Update document statuses as you collect them.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-5 text-xs">
            {[
              { dot: "bg-gray-500", label: "Pending" },
              { dot: "bg-blue-500", label: "Collected" },
              { dot: "bg-yellow-500", label: "Submitted" },
              { dot: "bg-green-500", label: "Approved" },
            ].map(({ dot, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-gray-400">
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {/* Student Visa Section */}
        <section>
          <VisaTracker
            title="🎓 Student Visa (FV)"
            subtitle="New Zealand Student Visa — step-by-step process from university offer to arrival"
            initialSteps={studentVisaSteps}
            accentColor="blue"
            storageKey="nz-student-visa-tracker"
          />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Dependent Visa Section */}
        <section>
          <VisaTracker
            title="👨‍👩‍👧 Dependent Visa"
            subtitle="Visa for spouse/partner and dependent children travelling with the student"
            initialSteps={dependentVisaSteps}
            accentColor="purple"
            storageKey="nz-dependent-visa-tracker"
          />
        </section>

        {/* Footer note */}
        <div className="bg-blue-950/30 border border-blue-800/30 rounded-xl p-5 text-sm text-gray-400">
          <p className="font-semibold text-blue-300 mb-1">📌 Important Note</p>
          <p>
            This tracker is for personal use to help you stay organised. Always refer to the official{" "}
            <a
              href="https://www.immigration.govt.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Immigration New Zealand website
            </a>{" "}
            for the most up-to-date requirements and processing times. Requirements may change.
          </p>
        </div>
      </div>
    </main>
  );
}
