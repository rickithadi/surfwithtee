"use client";

import { useForm, ValidationError } from "@formspree/react";

export function ContactFormWrapper() {
  const [state, handleSubmit] = useForm("mvzygben");
  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-[#E0E0D8] bg-[#FAFAF5] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A7075]/30 focus:border-[#0A7075] transition-colors";

  if (state.succeeded) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-md flex flex-col items-center justify-center gap-4 min-h-[320px] text-center">
        <div className="w-14 h-14 rounded-full bg-[#E0F4F4] flex items-center justify-center">
          <svg
            className="w-7 h-7 text-[#0A7075]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold text-[#1C2B2B]">
          Message Sent!
        </h3>
        <p className="text-sm text-[#2E4444] max-w-xs leading-relaxed">
          Thanks for reaching out — Tee will get back to you within a few hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 shadow-md space-y-5"
    >
      <h3 className="font-display text-2xl font-semibold text-[#1C2B2B] mb-2">
        Send a Message
      </h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className={inputCls}
          />
          <ValidationError
            field="email"
            errors={state.errors}
            className="text-xs text-red-500 mt-1 block"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">
          Lesson Type
        </label>
        <select
          name="lesson"
          required
          className={`${inputCls} text-[#2E4444]`}
        >
          <option value="">Select a package...</option>
          <option>Group Lesson</option>
          <option>Semi-Private</option>
          <option>Private Lesson</option>
          <option>Board Rental</option>
          <option>3-Day Private</option>
          <option>3-Day Semi-Private</option>
          <option>3-Day Group</option>
          <option>Not sure — help me choose</option>
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">
          Preferred Date
        </label>
        <input
          type="date"
          name="date"
          min={new Date().toISOString().split("T")[0]}
          className={`${inputCls} text-[#2E4444]`}
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[#2E4444] mb-2">
          Message
        </label>
        <textarea
          name="message"
          rows={3}
          required
          placeholder="Tell me your experience level, how many people, any questions..."
          className={`${inputCls} resize-none`}
        />
        <ValidationError
          field="message"
          errors={state.errors}
          className="text-xs text-red-500 mt-1 block"
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full py-3.5 bg-[#0A7075] text-white rounded-full font-medium text-sm tracking-wide hover:bg-[#065052] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state.submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
