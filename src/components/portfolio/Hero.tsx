import { motion } from "framer-motion";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section id="home" className="relative pt-40 md:pt-48 lg:pt-56">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-[12px] font-medium text-muted-foreground"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Available for opportunities
            <span className="mx-1 h-3 w-px bg-border" />
            <MapPin className="h-3 w-3" />
            Pune, India
          </motion.div>

          <motion.h1
            variants={item}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground"
          >
            Aryan Nitin
            <br />
            Kondekar<span className="text-muted-foreground">.</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-medium text-muted-foreground md:text-xl"
          >
            <span>Machine Learning Engineer</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>Python Developer</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>AI Enthusiast</span>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            I build machine learning systems end-to-end — from semantic search over 12K+
            document corpora with FAISS and sentence-transformers, to production MLOps
            pipelines with drift detection, model registries, and containerized inference APIs.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="/Aryan_Kondekar_Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <a
              href="https://github.com/Aryan41211"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground transition-all hover:bg-secondary"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/aryankondekar"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-foreground transition-all hover:bg-secondary"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
