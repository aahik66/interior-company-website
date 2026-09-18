import { useState } from "react";
import { API_BASE } from "../config/api";
import { HiOutlineX, HiCheckCircle } from "react-icons/hi";

const jobs = [
  {
    title: "Interior Designer",
    location: "Gulshan, Dhaka",
    qualification: "Degree / Interior Design / B.Arch",
    experience: "1-3 Years",
    specialization: "Residential Interiors",
  },
  {
    title: "Site Supervisor",
    location: "Dhaka, Bangladesh",
    qualification: "Diploma / Civil Engineering",
    experience: "1-2 Years",
    specialization: "Site Execution",
  },
  {
    title: "Sales Executive",
    location: "Banani, Dhaka",
    qualification: "Any Degree / Diploma",
    experience: "0-2 Years",
    specialization: "Client Handling & Estimation",
  },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    portfolio: "",
    coverLetter: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: job.experience || "",
      portfolio: "",
      coverLetter: "",
    });
    setSuccess(false);
    setError("");
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/careers/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: selectedJob.title,
          ...formData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit application");

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="careers" className="w-full bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 text-center" data-aos="fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">
            Careers
          </p>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl tracking-tight">
            Current Job Vacancies
          </h2>
          <p className="text-sm sm:text-base text-gray-600 sm:max-w-2xl sm:mx-auto">
            Join Dimension Composition and help us craft refined, modern architectural spaces across Dhaka, Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="rounded-2xl bg-white p-5 sm:p-6 shadow-md transition duration-300 hover:scale-[1.01] hover:shadow-lg flex flex-col justify-between"
              data-aos="fade-up"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{job.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{job.location}</p>
                  </div>
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500 shrink-0">
                    Open
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>
                    <span className="font-semibold text-gray-800">Qualification:</span>{" "}
                    {job.qualification}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Experience:</span>{" "}
                    {job.experience}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Specialization:</span>{" "}
                    {job.specialization}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenModal(job)}
                className="mt-5 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-brand-600 shadow-md shadow-brand-500/20"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <HiOutlineX className="h-5 w-5" />
            </button>

            {success ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <HiCheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Application Submitted!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for applying for the <span className="font-bold text-slate-900">{selectedJob.title}</span> role. Our HR & recruitment team has received your application in our mailbox and will contact you soon.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-4 rounded-full bg-slate-900 px-8 py-3 text-xs font-bold text-white hover:bg-brand-500 transition shadow-lg"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold text-brand-500 uppercase tracking-wider">
                    Job Application
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    Apply for {selectedJob.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedJob.location}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="applicant-name">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="applicant-name"
                        required
                        placeholder="e.g. Tanvir Hossain"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="applicant-email">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="applicant-email"
                        required
                        placeholder="tanvir@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="applicant-phone">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="applicant-phone"
                        required
                        placeholder="017XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="applicant-experience">
                        Experience Years
                      </label>
                      <input
                        type="text"
                        id="applicant-experience"
                        placeholder="e.g. 2 Years"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="applicant-portfolio">
                      Portfolio / Resume Link (Google Drive / LinkedIn / Website)
                    </label>
                    <input
                      type="url"
                      id="applicant-portfolio"
                      placeholder="https://drive.google.com/your-resume-link"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="applicant-coverletter">
                      Cover Letter / Message
                    </label>
                    <textarea
                      rows={4}
                      id="applicant-coverletter"
                      placeholder="Tell us briefly about your interior design background, skills, and why you'd like to join Dimension Composition..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-rose-500 font-semibold bg-rose-50 p-3 rounded-xl border border-rose-200">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-brand-500 py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:bg-brand-600 disabled:opacity-60"
                  >
                    {submitting ? "Submitting Application..." : "Submit Application"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
