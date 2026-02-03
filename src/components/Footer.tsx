function Footer() {
  return (
    <footer
      id="contact"
      className="mt-10 border-t border-black/5 bg-white/70 backdrop-blur"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-base font-extrabold tracking-tight text-slate-900">
              Lily Wallace
            </div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-700">
              Love me a pretty UI Design. Thanks for visiting! Make sure to check out my socials! 
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Contact
            </div>

            {/* ✅ Replace these with your real links */}
            <a
              href="mailto:lxw81650@ucmo.edu"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              Email: lxw81650@ucmo.edu
            </a>
            <a
              href="https://github.com/lilywall04"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lily-wallace-771b692ba"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/5 pt-6 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Lily Wallace</span>
          <span className="font-semibold">Built with React + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
