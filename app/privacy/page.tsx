import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Surf With Tee — how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://surfwithtee.com/privacy" },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF5] px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#0A7075] hover:underline mb-10 block"
        >
          ← Back to home
        </Link>

        <h1 className="font-display text-4xl font-semibold text-[#1C2B2B] mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#2E4444] mb-10">Last updated: May 2026</p>

        <div className="prose prose-sm max-w-none text-[#2E4444] space-y-8">
          <section>
            <h2 className="font-display text-xl font-semibold text-[#1C2B2B] mb-3">
              Who we are
            </h2>
            <p>
              Surf With Tee is a surf school based at Balangan Beach, Uluwatu,
              Bali, Indonesia. We are operated by Tee and can be reached at{" "}
              <a
                href="mailto:surfwitht@gmail.com"
                className="text-[#0A7075] hover:underline"
              >
                surfwitht@gmail.com
              </a>{" "}
              or via WhatsApp at{" "}
              <a
                href="https://wa.me/6281353282623"
                className="text-[#0A7075] hover:underline"
              >
                +62 813 5328 2623
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[#1C2B2B] mb-3">
              What information we collect
            </h2>
            <p>
              When you submit the contact or booking form on our website, we
              collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your preferred lesson type and date</li>
              <li>Any message you choose to send us</li>
            </ul>
            <p className="mt-3">
              We do not collect payment information through this website.
              Payments are handled directly in person or via agreed transfer
              methods.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[#1C2B2B] mb-3">
              How we use your information
            </h2>
            <p>We use the information you provide solely to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Respond to your booking or enquiry</li>
              <li>Confirm lesson details and logistics</li>
              <li>Follow up if a session needs to be rescheduled</li>
            </ul>
            <p className="mt-3">
              We will never sell, rent, or share your personal information with
              third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[#1C2B2B] mb-3">
              How your data is stored
            </h2>
            <p>
              Form submissions are processed and stored by{" "}
              <a
                href="https://formspree.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A7075] hover:underline"
              >
                Formspree
              </a>
              , a third-party form service. Their privacy policy can be found at
              formspree.io/legal/privacy-policy. We retain your submission only
              as long as it is needed to fulfill your booking or enquiry, and no
              longer than 12 months.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[#1C2B2B] mb-3">
              Your rights
            </h2>
            <p>
              If you are located in the European Economic Area, UK, or another
              jurisdiction with applicable data protection laws, you have the
              right to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to or restrict how we process your data</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:surfwitht@gmail.com"
                className="text-[#0A7075] hover:underline"
              >
                surfwitht@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[#1C2B2B] mb-3">
              Cookies
            </h2>
            <p>
              This website does not use tracking cookies or analytics scripts.
              We do not use Google Analytics or any advertising pixels.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[#1C2B2B] mb-3">
              Changes to this policy
            </h2>
            <p>
              We may update this policy occasionally. Any changes will be
              reflected on this page with an updated date. Continued use of the
              site after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-[#1C2B2B] mb-3">
              Contact
            </h2>
            <p>
              Questions about this policy? Email{" "}
              <a
                href="mailto:surfwitht@gmail.com"
                className="text-[#0A7075] hover:underline"
              >
                surfwitht@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
