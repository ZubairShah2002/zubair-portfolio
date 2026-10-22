/* ==========================================================================
   PORTFOLIO CONTENT CONFIGURATION
   --------------------------------------------------------------------------
   This is the single source of truth for every piece of text, every record,
   and every asset path on the site. Edit this file to update the portfolio.
   You should NOT need to touch the HTML, CSS, or other JS files to change
   a company name, add a job, add an audit record, or update contact details.

   See README.md -> "Content Management" for step-by-step instructions.
   ========================================================================== */

const CONTENT = {

  /* ----------------------------------------------------------------------
     1. PERSONAL PROFILE
     ---------------------------------------------------------------------- */
  profile: {
    name: "Zubair Shah",
    title: "Internal Quality",               // Primary professional headline. Keep exactly.
    industry: "Manufacturing Quality",
    location: "Malaysia",                     // General only. No street address.
    currentCompany: "Berex Tech (M) Sdn Bhd",
    currentPeriod: "2025 – Present",

    // Short line used under the name in the hero.
    tagline:
      "Quality control, supplier coordination, and documentation across manufacturing processes.",

    // Hero introduction. Two short paragraphs.
    introduction: [
      "Quality professional with experience across manufacturing, healthcare, and logistics operations. Currently involved in internal quality activities at Berex Tech (M) Sdn Bhd, with responsibilities spanning incoming material control, in-process quality monitoring, outgoing inspection, testing, supplier quality coordination, defect monitoring, and quality documentation.",
      "My professional focus is on product quality, supplier coordination, non-conformance follow-up, traceability, and continuous improvement across manufacturing processes."
    ]
  },

  /* ----------------------------------------------------------------------
     2. CONTACT INFORMATION
     Only confirmed details. Do not add LinkedIn, address, or socials
     unless they are real and you want them public.
     ---------------------------------------------------------------------- */
  contact: {
    email: "zubairshah0095@gmail.com",
    phone: "0173242151",
    phoneHref: "tel:0173242151",
    emailHref: "mailto:zubairshah0095@gmail.com"
  },

  /* ----------------------------------------------------------------------
     3. ASSET PATHS
     ---------------------------------------------------------------------- */
  assets: {
    // Personal portrait. Drop your file here and set `portraitAvailable` to true.
    // Recommended: vertical portrait, ~900 x 1200px, white shirt, white background.
    portrait: "assets/portrait/zubair-shah.jpg",
    portraitAvailable: false,   // <-- set true once you add the portrait file

    // Résumé. Drop a PDF here and set `resumeAvailable` to true to show the link.
    resume: "assets/resume/zubair-shah-resume.pdf",
    resumeAvailable: false      // <-- set true once you add the résumé file
  },

  /* ----------------------------------------------------------------------
     4. ABOUT
     ---------------------------------------------------------------------- */
  about: {
    paragraphs: [
      "My experience in quality began on the manufacturing floor as a Quality Inspector at Kossan Rubber Industries, where I worked within the inspection routines of a high-volume production environment.",
      "I continued in quality inspection at Mah Sing Healthcare Sdn Bhd, gaining exposure to the discipline that a healthcare manufacturing setting demands of its inspection and documentation practices.",
      "I then moved into a supervisory role at CJ Century Logistics, coordinating operations and people within a logistics environment — experience that broadened how I approach process, accountability, and day-to-day execution.",
      "Today, at Berex Tech (M) Sdn Bhd, I am involved in internal quality across the full production flow: incoming material control, in-process monitoring, outgoing inspection, and testing. This includes supplier quality coordination, defect monitoring, and quality documentation, alongside involvement in two new mattress development projects."
    ],
    // Short "at a glance" facts. Keep factual.
    facts: [
      { label: "Current focus", value: "Internal Quality" },
      { label: "Industry", value: "Manufacturing" },
      { label: "Based in", value: "Malaysia" }
    ]
  },

  /* ----------------------------------------------------------------------
     5. CAREER HISTORY
     Listed most-recent first for display. Edit, reorder, or add entries.
     Each entry: { id, company, title, period, context, responsibilities[] }
     ---------------------------------------------------------------------- */
  career: [
    {
      id: "berex",
      company: "Berex Tech (M) Sdn Bhd",
      title: "Internal Quality",
      period: "2025 – Present",
      context: "Manufacturing",
      current: true,
      responsibilities: [
        "Incoming material control, in-process quality monitoring, outgoing inspection, and testing",
        "Supplier quality coordination and defect monitoring",
        "Supplier audit participation",
        "NCR, CAPA, work instructions, and 8D reporting",
        "Involvement in two new mattress development projects"
      ]
    },
    {
      id: "cjcentury",
      company: "CJ Century Logistics",
      title: "Supervisor",
      period: "2022 – 2024",
      context: "Logistics operations",
      current: false,
      responsibilities: [
        "Supervisory role within logistics operations"
      ]
    },
    {
      id: "mahsing",
      company: "Mah Sing Healthcare Sdn Bhd",
      title: "Quality Inspector",
      period: "2019 – 2021",
      context: "Healthcare manufacturing",
      current: false,
      responsibilities: [
        "Quality inspection within a healthcare manufacturing environment"
      ]
    },
    {
      id: "kossan",
      company: "Kossan Rubber Industries",
      title: "Quality Inspector",
      period: "2018 – 2019",
      context: "Manufacturing",
      current: false,
      responsibilities: [
        "Quality inspection"
      ]
    }
  ],

  /* ----------------------------------------------------------------------
     6. SELECTED CONTRIBUTIONS & QUALITY IMPROVEMENTS
     Responsibilities and involvement — not fabricated outcomes.
     Each entry: { id, ref, title, context, involvement, objective }
     ---------------------------------------------------------------------- */
  contributions: [
    {
      id: "mattress",
      ref: "A",
      title: "New Mattress Development",
      context: "Two new product development projects at Berex Tech.",
      involvement: "Involved in quality-related activities supporting the development of two new mattress products.",
      objective: "Support product quality considerations as new products move through development."
    },
    {
      id: "e2e",
      ref: "B",
      title: "End-to-End Quality Control",
      context: "Quality is monitored at each stage of the manufacturing flow.",
      involvement: "Involved across incoming quality control, in-process quality control, outgoing inspection, and material and product testing.",
      objective: "Help ensure quality is observed and recorded at each manufacturing stage rather than at a single checkpoint."
    },
    {
      id: "supplier-coord",
      ref: "C",
      title: "Supplier Quality Coordination",
      context: "Raw material quality issues require direct communication with suppliers.",
      involvement: "Communicate with suppliers to clarify defects, raise quality concerns, and follow up on corrective actions where applicable.",
      objective: "Support clear, documented communication between the company and its suppliers on quality matters."
    },
    {
      id: "ncr",
      ref: "D",
      title: "Non-Conformance Reporting",
      context: "Identified quality issues are recorded and communicated through NCRs.",
      involvement: "Involved in NCR documentation and follow-up for identified quality issues.",
      objective: "Record and communicate non-conformances accurately so they can be addressed and tracked."
    },
    {
      id: "capa",
      ref: "E",
      title: "Corrective & Preventive Actions",
      context: "Recurring or significant issues call for structured corrective and preventive action.",
      involvement: "Involved in CAPA-related activities supporting investigation, containment, resolution, and prevention.",
      objective: "Support actions that address the root of an issue and reduce the chance of recurrence."
    },
    {
      id: "8d",
      ref: "F",
      title: "8D Problem-Solving Reporting",
      context: "Structured problem-solving is documented through the 8D method.",
      involvement: "Involved in 8D reporting covering problem description, investigation, containment, corrective actions, and preventive measures.",
      objective: "Contribute to disciplined, documented problem-solving."
    },
    {
      id: "work-instructions",
      ref: "G",
      title: "Work Instructions",
      context: "Consistent work practices depend on documented requirements.",
      involvement: "Involved in preparing or maintaining work instructions.",
      objective: "Support consistency through clear, documented work practices."
    },
    {
      id: "defect",
      ref: "H",
      title: "Defect Monitoring",
      context: "Accurate defect records support identification and follow-up.",
      involvement: "Involved in monitoring and documenting quality defects.",
      objective: "Maintain accurate defect records that support reporting and follow-up."
    },
    {
      id: "audit-participation",
      ref: "I",
      title: "Supplier Quality Audit Participation",
      context: "Supplier quality is reviewed through audit activities.",
      involvement: "Involved in supplier quality audit activities. See the Supplier Quality Audit Experience section.",
      objective: "Participate in reviewing supplier quality.",
      link: "#audits"
    },
    {
      id: "traceability",
      ref: "J",
      title: "Quality Records & Traceability",
      context: "Records support traceability of quality issues and materials.",
      involvement: "Involved in quality documentation and traceability where applicable, including records relating to quality issues, rejected materials, supplier communication, and corrective-action follow-up.",
      objective: "Maintain records that support traceability and follow-up."
    },
    {
      id: "cross-functional",
      ref: "K",
      title: "Cross-Functional Quality Coordination",
      context: "Quality issues require clear communication across functions.",
      involvement: "Involved in coordinating quality-related communication with relevant production personnel and suppliers.",
      objective: "Communicate issues clearly and support timely follow-up."
    }
  ],

  /* ----------------------------------------------------------------------
     7. SUPPLIER QUALITY AUDIT EXPERIENCE
     Eight records. Only company names and purpose are confirmed.
     To add an image: drop the file in assets/suppliers/ and set `image`.
     To add a location/details: fill the empty string fields below.
     Leave fields "" (empty) to show a neutral "to be provided" state.
     ---------------------------------------------------------------------- */
  audits: [
    { id: "a01", company: "LSK Napure Latex Sdn Bhd",           purpose: "Quality Audit", image: "assets/suppliers/lsk-napure-latex.jpg",        location: "", date: "", scope: "", role: "", status: "" },
    { id: "a02", company: "Hin Trading Company Sdn Bhd",        purpose: "Quality Audit", image: "assets/suppliers/hin-trading.jpg",             location: "", date: "", scope: "", role: "", status: "" },
    { id: "a03", company: "Multipack Industrial Supplies Sdn Bhd", purpose: "Quality Audit", image: "assets/suppliers/multipack-industrial.jpg", location: "", date: "", scope: "", role: "", status: "" },
    { id: "a04", company: "Maus Industries Sdn Bhd",            purpose: "Quality Audit", image: "assets/suppliers/maus-industries.jpg",         location: "", date: "", scope: "", role: "", status: "" },
    { id: "a05", company: "Lian Ngoi Industry Sdn Bhd",         purpose: "Quality Audit", image: "assets/suppliers/lian-ngoi-industry.jpg",      location: "", date: "", scope: "", role: "", status: "" },
    { id: "a06", company: "Sleep Matic Asia Sdn Bhd",           purpose: "Quality Audit", image: "assets/suppliers/sleep-matic-asia.jpg",        location: "", date: "", scope: "", role: "", status: "" },
    { id: "a07", company: "CHL Foam Industries Sdn Bhd",        purpose: "Quality Audit", image: "assets/suppliers/chl-foam-industries.jpg",     location: "", date: "", scope: "", role: "", status: "" },
    { id: "a08", company: "Kis Wire Sdn Bhd",                   purpose: "Quality Audit", image: "assets/suppliers/kis-wire.jpg",                location: "", date: "", scope: "", role: "", status: "" }
  ],

  /* ----------------------------------------------------------------------
     8. TECHNICAL COMPETENCIES
     Grouped lists. No proficiency scores or bars by design.
     ---------------------------------------------------------------------- */
  competencies: [
    {
      group: "Quality Control",
      skills: [
        "Incoming Quality Control",
        "In-Process Quality Control",
        "Outgoing Quality Inspection",
        "Material & Product Testing",
        "Defect Identification",
        "Defect Monitoring"
      ]
    },
    {
      group: "Supplier Quality",
      skills: [
        "Supplier Quality Communication",
        "Supplier Quality Issue Follow-Up",
        "Raw Material Quality Issues",
        "Supplier Quality Audit Participation"
      ]
    },
    {
      group: "Quality Systems & Documentation",
      skills: [
        "Non-Conformance Reporting (NCR)",
        "Corrective & Preventive Action (CAPA)",
        "8D Reporting",
        "Work Instructions",
        "Quality Documentation",
        "Traceability Support"
      ]
    },
    {
      group: "Manufacturing Quality Support",
      skills: [
        "New Mattress Development Project Involvement",
        "Production Quality Monitoring",
        "Defect Follow-Up",
        "Cross-Functional Quality Coordination"
      ]
    }
  ],

  /* ----------------------------------------------------------------------
     9. SELECTED PROJECTS & WORK SAMPLES
     Empty by design until real, approved samples exist.
     Add entries to `items` to populate. See README.
     ---------------------------------------------------------------------- */
  projects: {
    intro:
      "This section is reserved for approved work samples and project documentation — new mattress development contributions, defect analysis, supplier rejection tracking, non-conformance documentation, and corrective-action follow-up. Materials are added here only once reviewed and cleared for sharing.",
    items: [
      // Example of the shape to add later (remove this comment, keep the object pattern):
      // {
      //   id: "proj-01",
      //   title: "Project title",
      //   context: "Context",
      //   contribution: "My contribution",
      //   method: "Method",
      //   outcome: "Outcome (only if verified)",
      //   image: "assets/projects/your-image.jpg" // optional
      // }
    ]
  },

  /* ----------------------------------------------------------------------
     10. EDUCATION & CERTIFICATIONS
     Empty by design. Add entries to `items` when records are confirmed.
     Fields: { institution, qualification, date, type, credentialUrl }
     ---------------------------------------------------------------------- */
  education: {
    note: "Education and certification records will be listed here once confirmed.",
    items: [
      // {
      //   institution: "Institution or training provider",
      //   qualification: "Qualification or course",
      //   date: "Completion date",
      //   type: "Certification type",
      //   credentialUrl: ""   // optional
      // }
    ]
  },

  /* ----------------------------------------------------------------------
     11. SEO / META  (consumed by index.html via build-time copy; kept here
     for reference and single-source documentation)
     ---------------------------------------------------------------------- */
  meta: {
    pageTitle: "Zubair Shah | Internal Quality Professional",
    description:
      "Professional portfolio of Zubair Shah, highlighting manufacturing quality experience, supplier quality audit participation, quality control activities, and professional contributions."
  }
};

/* Expose for the renderer. */
if (typeof window !== "undefined") { window.CONTENT = CONTENT; }
