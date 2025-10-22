import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about The Integrator Project - our mission, values, and approach to making quality tutoring accessible to all students.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-screen bg-black">
      <Navigation />
      
      <main className="relative w-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] w-screen overflow-hidden bg-gradient-to-b from-blue-900/20 to-black">
          <div className="relative mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center gap-8 px-6 py-20 text-center md:px-10 lg:px-16">
            <h1 className="text-5xl font-extralight leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
              About Us
            </h1>
            <p className="max-w-3xl text-center text-lg font-light leading-relaxed tracking-tight text-white/75 sm:text-xl">
              We are a mission-driven integrator of learning, built on firsthand experience serving low-income communities, students with disabilities, and audiences at ASTC museums.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative w-screen bg-black py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
            <h2 className="text-4xl font-extralight text-white mb-12 text-center">Our Mission</h2>
            <div className="space-y-6 text-white/80 font-light leading-relaxed text-lg">
              <p>
                To further the world of math by bridging gaps in opportunity, elevating underrepresented learners, and making tutoring accessible through compassionate mentorship.
              </p>
              <p>
                Drawing from decades of direct work in classrooms, community settings, and museum outreach, we aim to:
              </p>
              <ul className="space-y-3 list-disc list-inside ml-4">
                <li>Empower low-income students with rigorous, joyful math education they might otherwise never receive</li>
                <li>Design and adapt instruction for learners with Down syndrome, helping them engage with number, pattern, and logic in meaningful ways</li>
                <li>Leverage our experience at MoMath to blend creativity, play, and theory — changing how math is experienced</li>
                <li>Advocate for inclusion, equity, and accessibility in all educational spaces</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="relative w-screen bg-white/5 py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
            <h2 className="text-4xl font-extralight text-white mb-12 text-center">Core Beliefs & Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-light text-white">Equity & Access</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  We believe math should belong to everyone. We center voices and experiences too often left out of the mathematical conversation.
                </p>
              </div>
              <div className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-light text-white">Empathy & Respect for Learners</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  Every student comes with unique strengths, backgrounds, and challenges. We adapt, we listen, we grow alongside them.
                </p>
              </div>
              <div className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-light text-white">Evidence + Innovation</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  Our practices are rooted both in research and on-the-ground feedback. We experiment, refine, iterate.
                </p>
              </div>
              <div className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-light text-white">Mathematics as a Living Discipline</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  Math is alive — full of exploration, wonder, and surprise. We reject rote drill; we invite curiosity and connection.
                </p>
              </div>
              <div className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-6 md:col-span-2">
                <h3 className="text-xl font-light text-white">Community & Collaboration</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  Education is not done in isolation. We partner with families, schools, colleagues, and communities to amplify impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="relative w-screen bg-black py-20">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
            <h2 className="text-4xl font-extralight text-white mb-12 text-center">What We Do</h2>
            <div className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-2xl font-light text-white mb-4">Tailored Learning Journeys</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  Each learner gets a path built around their interests, prior knowledge, and goals, not a one-size-fits-all curriculum.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-2xl font-light text-white mb-4">Inclusive Design for Diverse Learners</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  With experience working with students with learning challenges and differences, we design lessons that are structured but flexible.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-2xl font-light text-white mb-4">Outreach & Cultural Engagement in Math</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  Leveraging our MoMath background, we build hands-on experiences, public math exhibitions, and community-facing programs that change the narrative about who does math and how.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-2xl font-light text-white mb-4">Data-Informed Reflection</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  We track understanding, not just grade-level gaps. We reflect, adjust, and iterate with humility and intention.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-2xl font-light text-white mb-4">Partnership with Families & Institutions</h3>
                <p className="text-white/75 font-light leading-relaxed">
                  We see families as co-educators and institutions (schools, museums) as allies. Open communication, transparency, and shared goals drive our collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative w-screen bg-gradient-to-t from-blue-900/20 to-black py-20">
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10 lg:px-16">
            <h2 className="text-3xl font-extralight text-white mb-6">Ready to Get Started?</h2>
            <p className="text-white/75 font-light leading-relaxed mb-8">
              Join us in reshaping the learning landscape, making it more equitable, joyful, and human.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/#register"
                className="rounded-2xl border border-white/30 bg-gradient-to-r from-white/15 to-white/10 px-10 py-4 text-lg font-medium tracking-tight text-white backdrop-blur-sm transition-all duration-300 hover:from-white/25 hover:to-white/15 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                Register as a Student
              </Link>
              <Link
                href="/volunteer"
                className="rounded-2xl border border-white/20 bg-white/10 px-10 py-4 text-lg font-light tracking-tight text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Volunteer as a Tutor
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


