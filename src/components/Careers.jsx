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
          {jobs.map((job) => {
            const message = encodeURIComponent(
              `Hello Dimension Composition! I am applying for the ${job.title} role in Dhaka.`
            );
            const whatsappUrl = `https://wa.me/8801739835017?text=${message}`;
            return (
              <div
                key={job.title}
                className="rounded-2xl bg-white p-5 sm:p-6 shadow-md transition duration-300 hover:scale-[1.01] hover:shadow-lg"
                data-aos="fade-up"
              >
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

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-brand-600 shadow-md shadow-brand-500/20"
                >
                  Apply Now
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
