"use client"

import Image from "next/image"
import Link from "next/link"
import { useUser } from "./provider"
import {
  ArrowRight,
  Bot,
  BarChart3,
  Clock,
  Shield,
  Users,
  Zap,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Star,
  ChevronRight,
} from "lucide-react"

export default function Home() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ─── Navbar ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Logo.png" alt="AICruiter" width={140} height={40} className="h-8 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="hidden sm:inline-flex px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 md:pt-44 md:pb-32">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-chart-2/8 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Powered by Advanced AI
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Hire Smarter with{" "}
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                AI-Driven
              </span>{" "}
              Interviews
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Create AI-powered interviews, evaluate candidates automatically, and get instant feedback — all in one platform. No more scheduling hassles.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href={user ? "/dashboard/create-interview" : "/auth"}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Interviewing
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-semibold text-lg hover:bg-muted transition-colors"
              >
                See How It Works
              </a>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[
                  "bg-chart-1",
                  "bg-chart-2",
                  "bg-chart-3",
                  "bg-chart-4",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`h-9 w-9 rounded-full ${bg} ring-2 ring-background flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["T", "A", "K", "R"][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-muted-foreground">Trusted by 500+ recruiters</span>
              </div>
            </div>
          </div>

          {/* Right illustration */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-3/20 rounded-3xl blur-2xl scale-95" />
              <div className="relative bg-card border border-border rounded-3xl p-2 shadow-2xl">
                <Image
                  src="/hero-illustration.png"
                  alt="AI Interview Platform"
                  width={600}
                  height={450}
                  className="rounded-2xl w-full h-auto"
                  priority
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="p-2.5 bg-green-500/10 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Interview Complete</p>
                  <p className="text-xs text-muted-foreground">Score: 8.5/10 — Recommended</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ──────────────────────────────────────── */}
      <section className="border-y border-border/50 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "10k+", label: "Interviews Conducted" },
            { val: "500+", label: "Companies Trust Us" },
            { val: "95%", label: "Time Saved" },
            { val: "4.9/5", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-bold text-primary">{stat.val}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features ───────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
              <Zap className="h-4 w-4" />
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything You Need to Hire Better
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From creating interviews to evaluating candidates, our AI handles the heavy lifting so you can focus on what matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                title: "AI-Powered Questions",
                desc: "Generate role-specific interview questions tailored to any job description, duration, and interview type.",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                icon: MessageSquare,
                title: "Voice-Based Interviews",
                desc: "Candidates take interviews via a conversational AI assistant — just like a real phone screen.",
                color: "text-chart-2",
                bg: "bg-chart-2/10",
              },
              {
                icon: BarChart3,
                title: "Instant Feedback & Scoring",
                desc: "Get detailed ratings on technical skills, communication, problem solving, and experience after each interview.",
                color: "text-chart-3",
                bg: "bg-chart-3/10",
              },
              {
                icon: Users,
                title: "Candidate Management",
                desc: "Track all candidates, review their performance, and compare results from a single dashboard.",
                color: "text-chart-4",
                bg: "bg-chart-4/10",
              },
              {
                icon: Clock,
                title: "Save 95% of Time",
                desc: "No more back-and-forth scheduling. Share a link and let candidates interview at their convenience.",
                color: "text-amber-500",
                bg: "bg-amber-500/10",
              },
              {
                icon: Shield,
                title: "Unbiased & Consistent",
                desc: "Every candidate gets the same structured experience — removing interviewer bias from the process.",
                color: "text-green-500",
                bg: "bg-green-500/10",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ───────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
              <CheckCircle className="h-4 w-4" />
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Three Steps to Better Hiring
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes — no complex setup or training required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create an Interview",
                desc: "Enter the job title, description, and interview type. Our AI generates tailored questions instantly.",
                link: user ? "/dashboard/create-interview" : "/auth",
                linkText: "Create Interview",
              },
              {
                step: "02",
                title: "Share the Link",
                desc: "Send the unique interview link to candidates. They can take the interview anytime, anywhere.",
                link: user ? "/all-interview" : "/auth",
                linkText: "View Interviews",
              },
              {
                step: "03",
                title: "Review Results",
                desc: "Get AI-generated feedback with scores on technical skills, communication, and a hire recommendation.",
                link: user ? "/scheduled-interview" : "/auth",
                linkText: "See Feedback",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative bg-card border border-border rounded-2xl p-8 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary text-xl font-bold mb-5">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-5">{item.desc}</p>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-3 transition-all"
                >
                  {item.linkText}
                  <ChevronRight className="h-4 w-4" />
                </Link>
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ───────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
              <Star className="h-4 w-4" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Loved by Hiring Teams
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                role: "HR Manager, TechCorp",
                text: "AICruiter cut our screening time by 80%. The AI-generated feedback is incredibly detailed and accurate. It's like having a senior interviewer available 24/7.",
                initials: "PS",
                color: "bg-chart-1",
              },
              {
                name: "Rahul Verma",
                role: "Startup Founder",
                text: "As a solo founder, I couldn't afford to spend hours interviewing. AICruiter lets me focus on building while it handles the initial rounds. Game changer.",
                initials: "RV",
                color: "bg-chart-3",
              },
              {
                name: "Ananya Patel",
                role: "Recruitment Lead",
                text: "The consistency is what sold me. Every candidate gets the same experience, and the scoring is objective. We've improved our hire quality significantly.",
                initials: "AP",
                color: "bg-chart-4",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-chart-3/15 rounded-3xl blur-2xl" />
          <div className="relative bg-card border border-border rounded-3xl p-12 md:p-16 text-center shadow-xl">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Join hundreds of companies using AICruiter to hire smarter, faster, and more fairly. Start with 5 free interview credits.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                href={user ? "/dashboard" : "/auth"}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                {user ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              {!user && (
                <p className="text-sm text-muted-foreground">No credit card required · 5 free credits</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border/50 bg-muted/30 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Image src="/Logo.png" alt="AI-Interviewer" width={120} height={40} className="h-7 w-auto mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI-powered interview platform that makes hiring smarter and hassle-free.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Product</h4>
              <div className="flex flex-col gap-2.5">
                <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
                <Link href="/billing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Platform</h4>
              <div className="flex flex-col gap-2.5">
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
                <Link href="/dashboard/create-interview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Create Interview</Link>
                <Link href="/all-interview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Interviews</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Account</h4>
              <div className="flex flex-col gap-2.5">
                <Link href="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
                <Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Settings</Link>
                <Link href="/billing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Billing</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AI-Interviewer
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by Tushar Ambast
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Custom animation ──────────────────────────────── */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
