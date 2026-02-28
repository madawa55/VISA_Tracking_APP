export type DocumentStatus = "pending" | "collected" | "submitted" | "approved";
export type StepStatus = "not-started" | "in-progress" | "completed" | "blocked";

export interface Document {
  id: string;
  name: string;
  description: string;
  status: DocumentStatus;
  required: boolean;
  notes?: string;
}

export interface VisaStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  status: StepStatus;
  documents: Document[];
  estimatedDays?: string;
  tips?: string[];
}

export interface VisaTracker {
  type: "student" | "dependent";
  title: string;
  steps: VisaStep[];
}

export const studentVisaSteps: VisaStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "University Application & Offer Letter",
    description: "Apply to a New Zealand university and receive your official offer of place.",
    status: "in-progress",
    estimatedDays: "2–8 weeks",
    tips: [
      "Apply to multiple universities to increase your chances",
      "Check entry requirements carefully before applying",
      "Keep copies of all correspondence with the university",
    ],
    documents: [
      {
        id: "doc-1-1",
        name: "Offer of Place Letter",
        description: "Official acceptance letter from the NZ university",
        status: "pending",
        required: true,
      },
      {
        id: "doc-1-2",
        name: "Academic Transcripts",
        description: "Certified copies of all previous academic qualifications",
        status: "collected",
        required: true,
      },
      {
        id: "doc-1-3",
        name: "English Language Test Results",
        description: "IELTS / TOEFL / PTE scores (if required by university)",
        status: "pending",
        required: true,
      },
      {
        id: "doc-1-4",
        name: "Statement of Purpose / Personal Statement",
        description: "Written statement explaining your study goals",
        status: "collected",
        required: false,
      },
    ],
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "Document Collection",
    description: "Gather all required documents for your student visa application.",
    status: "in-progress",
    estimatedDays: "2–4 weeks",
    tips: [
      "Get documents certified/notarised where required",
      "Ensure passport is valid for at least 3 months beyond your intended stay",
      "Bank statements should show funds for at least 3 months",
    ],
    documents: [
      {
        id: "doc-2-1",
        name: "Valid Passport",
        description: "Passport valid for the duration of your study + 3 months",
        status: "collected",
        required: true,
      },
      {
        id: "doc-2-2",
        name: "Passport-size Photos",
        description: "Recent passport photos meeting NZ immigration requirements",
        status: "pending",
        required: true,
      },
      {
        id: "doc-2-3",
        name: "Proof of Funds",
        description: "Bank statements showing NZD 15,000+ per year of study",
        status: "pending",
        required: true,
      },
      {
        id: "doc-2-4",
        name: "Scholarship Letter",
        description: "If applicable, official scholarship award letter",
        status: "pending",
        required: false,
      },
      {
        id: "doc-2-5",
        name: "Medical Insurance",
        description: "Proof of health insurance for the duration of study",
        status: "pending",
        required: true,
      },
      {
        id: "doc-2-6",
        name: "Police Clearance Certificate",
        description: "Criminal background check from your home country",
        status: "pending",
        required: true,
      },
      {
        id: "doc-2-7",
        name: "Medical Certificate",
        description: "Medical examination by an approved panel physician (if required)",
        status: "pending",
        required: false,
      },
    ],
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "Visa Application Submission",
    description: "Submit your student visa application online via Immigration New Zealand.",
    status: "not-started",
    estimatedDays: "1–2 days",
    tips: [
      "Apply online at immigration.govt.nz",
      "Pay the visa application fee (approx. NZD 375)",
      "Double-check all documents before submitting",
      "Keep your application reference number safe",
    ],
    documents: [
      {
        id: "doc-3-1",
        name: "Completed Visa Application Form",
        description: "Online application form via Immigration NZ portal",
        status: "pending",
        required: true,
      },
      {
        id: "doc-3-2",
        name: "Visa Application Fee Receipt",
        description: "Payment confirmation for the visa application fee",
        status: "pending",
        required: true,
      },
      {
        id: "doc-3-3",
        name: "Biometrics Enrollment",
        description: "Fingerprints and photo at a Visa Application Centre (if required)",
        status: "pending",
        required: false,
      },
    ],
  },
  {
    id: "step-4",
    stepNumber: 4,
    title: "Visa Processing",
    description: "Immigration New Zealand reviews your application. Processing times vary.",
    status: "not-started",
    estimatedDays: "4–8 weeks",
    tips: [
      "Check your application status online regularly",
      "Respond promptly to any requests for additional information",
      "Do not make non-refundable travel bookings until visa is approved",
    ],
    documents: [
      {
        id: "doc-4-1",
        name: "Additional Documents (if requested)",
        description: "Any extra documents requested by Immigration NZ during processing",
        status: "pending",
        required: false,
      },
    ],
  },
  {
    id: "step-5",
    stepNumber: 5,
    title: "Visa Approval & Pre-Departure",
    description: "Receive your visa approval and prepare for travel to New Zealand.",
    status: "not-started",
    estimatedDays: "1–2 weeks",
    tips: [
      "Book flights after visa approval",
      "Arrange accommodation in NZ",
      "Enroll in university orientation program",
      "Notify your bank about international travel",
    ],
    documents: [
      {
        id: "doc-5-1",
        name: "Visa Approval Letter / eVisa",
        description: "Official visa grant notice from Immigration NZ",
        status: "pending",
        required: true,
      },
      {
        id: "doc-5-2",
        name: "Flight Booking Confirmation",
        description: "Confirmed return or onward flight tickets",
        status: "pending",
        required: true,
      },
      {
        id: "doc-5-3",
        name: "Accommodation Proof",
        description: "Confirmed accommodation for at least first few weeks in NZ",
        status: "pending",
        required: true,
      },
    ],
  },
  {
    id: "step-6",
    stepNumber: 6,
    title: "Arrival in New Zealand",
    description: "Arrive in NZ, clear immigration, and begin your studies.",
    status: "not-started",
    estimatedDays: "Ongoing",
    tips: [
      "Carry all original documents in your hand luggage",
      "Register with your university on arrival",
      "Open a NZ bank account early",
      "Get a NZ SIM card for local communication",
    ],
    documents: [
      {
        id: "doc-6-1",
        name: "Arrival Card",
        description: "NZ Passenger Arrival Card (completed on the plane)",
        status: "pending",
        required: true,
      },
      {
        id: "doc-6-2",
        name: "University Enrollment Confirmation",
        description: "Proof of enrollment for immigration officer",
        status: "pending",
        required: true,
      },
    ],
  },
];

export const dependentVisaSteps: VisaStep[] = [
  {
    id: "dep-step-1",
    stepNumber: 1,
    title: "Eligibility Check",
    description: "Confirm your dependents are eligible to apply for a dependent visa alongside your student visa.",
    status: "not-started",
    estimatedDays: "1–3 days",
    tips: [
      "Eligible dependents: spouse/partner and dependent children under 19",
      "Dependent visa is usually applied together with or after the student visa",
      "Check if your course duration qualifies (usually 12+ months)",
    ],
    documents: [
      {
        id: "dep-doc-1-1",
        name: "Proof of Relationship",
        description: "Marriage certificate (for spouse) or birth certificate (for children)",
        status: "pending",
        required: true,
      },
      {
        id: "dep-doc-1-2",
        name: "Student Visa Approval / Application Reference",
        description: "Copy of the main applicant's student visa or application number",
        status: "pending",
        required: true,
      },
    ],
  },
  {
    id: "dep-step-2",
    stepNumber: 2,
    title: "Dependent Document Collection",
    description: "Gather all required documents for each dependent applicant.",
    status: "not-started",
    estimatedDays: "2–3 weeks",
    tips: [
      "Each dependent needs their own set of documents",
      "Children's documents must be certified copies",
      "Ensure all documents are translated to English if in another language",
    ],
    documents: [
      {
        id: "dep-doc-2-1",
        name: "Dependent's Valid Passport",
        description: "Passport for each dependent applicant",
        status: "pending",
        required: true,
      },
      {
        id: "dep-doc-2-2",
        name: "Passport-size Photos",
        description: "Recent photos for each dependent",
        status: "pending",
        required: true,
      },
      {
        id: "dep-doc-2-3",
        name: "Marriage Certificate",
        description: "Certified copy of marriage certificate (for spouse/partner)",
        status: "pending",
        required: true,
      },
      {
        id: "dep-doc-2-4",
        name: "Birth Certificate(s)",
        description: "Certified birth certificates for dependent children",
        status: "pending",
        required: false,
      },
      {
        id: "dep-doc-2-5",
        name: "Medical Insurance for Dependents",
        description: "Health insurance covering all dependents for the stay duration",
        status: "pending",
        required: true,
      },
      {
        id: "dep-doc-2-6",
        name: "Police Clearance (Dependents 17+)",
        description: "Criminal background check for dependents aged 17 and above",
        status: "pending",
        required: true,
      },
      {
        id: "dep-doc-2-7",
        name: "Proof of Additional Funds",
        description: "Evidence of extra funds to support dependents (NZD 4,200/year per dependent)",
        status: "pending",
        required: true,
      },
    ],
  },
  {
    id: "dep-step-3",
    stepNumber: 3,
    title: "Dependent Visa Application",
    description: "Submit the dependent visa application online via Immigration New Zealand.",
    status: "not-started",
    estimatedDays: "1–2 days",
    tips: [
      "Apply online at immigration.govt.nz",
      "Each dependent needs a separate application",
      "Visa fee applies per dependent applicant",
      "Link applications to the main student visa application",
    ],
    documents: [
      {
        id: "dep-doc-3-1",
        name: "Completed Dependent Visa Application",
        description: "Online application form for each dependent",
        status: "pending",
        required: true,
      },
      {
        id: "dep-doc-3-2",
        name: "Visa Application Fee Receipt",
        description: "Payment confirmation for each dependent's visa fee",
        status: "pending",
        required: true,
      },
    ],
  },
  {
    id: "dep-step-4",
    stepNumber: 4,
    title: "Dependent Visa Processing",
    description: "Immigration NZ reviews the dependent visa applications.",
    status: "not-started",
    estimatedDays: "4–8 weeks",
    tips: [
      "Processing may happen alongside the student visa",
      "Respond quickly to any requests for additional information",
      "Track application status online",
    ],
    documents: [
      {
        id: "dep-doc-4-1",
        name: "Additional Documents (if requested)",
        description: "Any extra documents requested during processing",
        status: "pending",
        required: false,
      },
    ],
  },
  {
    id: "dep-step-5",
    stepNumber: 5,
    title: "Dependent Visa Approval",
    description: "Receive visa approvals for all dependents and prepare for travel together.",
    status: "not-started",
    estimatedDays: "1 week",
    tips: [
      "Book family flights together after all visas are approved",
      "Arrange family-friendly accommodation in NZ",
      "Research schools for dependent children if applicable",
    ],
    documents: [
      {
        id: "dep-doc-5-1",
        name: "Dependent Visa Approval Letters",
        description: "Official visa grant notices for each dependent",
        status: "pending",
        required: true,
      },
      {
        id: "dep-doc-5-2",
        name: "School Enrollment (for children)",
        description: "Enrollment confirmation at a NZ school for dependent children",
        status: "pending",
        required: false,
      },
    ],
  },
];
