"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: { category: string; emoji: string; items: FAQItem[] }[] = [
  {
    category: "Booking & Payment",
    emoji: "💳",
    items: [
      {
        question: "How do I book a tour?",
        answer:
          "You can book through our website by visiting the tour page and clicking 'Book This Tour', or by filling out our booking form. You can also contact us directly via WhatsApp or email. We'll confirm your booking within 24 hours.",
      },
      {
        question: "Do I need to pay upfront?",
        answer:
          "We offer two options: (1) Pay online through our secure Stripe payment system, or (2) Submit a booking request and pay on the day of the tour in cash (KRW or USD). No upfront payment is required for option 2.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Free cancellation up to 48 hours before the tour. Cancellations within 24-48 hours receive a 50% refund. No refund for cancellations less than 24 hours before the tour. Weather-related cancellations by us are always fully refunded.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "Online: All major credit/debit cards (Visa, Mastercard, AMEX) via Stripe. In person: Korean Won (KRW) cash, US Dollars (USD). We cannot accept checks or bank transfers at this time.",
      },
    ],
  },
  {
    category: "Tour Details",
    emoji: "🗺️",
    items: [
      {
        question: "Are tours available every day?",
        answer:
          "Most tours are available daily, but the Homigot Sunrise Tour depends on weather conditions. We recommend booking at least 3 days in advance. Some tours may not be available on major Korean holidays.",
      },
      {
        question: "What languages do you offer?",
        answer:
          "All tours are conducted in English. Our guide is a Korean government-certified tour interpreter guide (관광통역안내사) with fluent English. We're planning to add Japanese tours in the future.",
      },
      {
        question: "Can you customize a tour?",
        answer:
          "Absolutely! We love creating custom itineraries. Tell us your interests, available time, and group size, and we'll design a tour just for you. Custom tours may have different pricing — contact us for a quote.",
      },
      {
        question: "What is the group size?",
        answer:
          "Our tours are small and personal. Most tours accommodate 2-8 people. The Temple & Waterfall Hiking tour is limited to 6 people for safety. Solo travelers are welcome — we can arrange a private tour or pair you with another group.",
      },
      {
        question: "What should I wear/bring?",
        answer:
          "Comfortable walking shoes are essential for all tours. For the Temple & Waterfall Hiking tour, bring proper hiking shoes, rain gear, and layered clothing. Sunscreen and a hat are recommended in summer. We provide water and snacks on all tours.",
      },
    ],
  },
  {
    category: "Getting to Pohang",
    emoji: "✈️",
    items: [
      {
        question: "How do I get to Pohang?",
        answer:
          "From Seoul: KTX high-speed train to Pohang Station (about 2.5 hours). From Busan: Express bus from Busan Central Bus Terminal (about 1.5 hours). From Incheon Airport: Airport limousine bus or KTX via Seoul Station. We can help arrange transportation from the airport.",
      },
      {
        question: "Do you provide hotel pickup?",
        answer:
          "Yes! Most tours include complimentary hotel pickup and drop-off within central Pohang. For the Seafood & Market Tour, we meet at Jukdo Market entrance. Exact pickup details are sent after booking confirmation.",
      },
      {
        question: "Where should I stay in Pohang?",
        answer:
          "We recommend staying near Yeongildae Beach or Pohang Station for easy access to all tours. Popular options include hotels near the waterfront, guesthouses in the old town, and modern hotels near POSCO. We're happy to provide specific recommendations based on your budget.",
      },
    ],
  },
  {
    category: "Weather & Season",
    emoji: "🌤️",
    items: [
      {
        question: "What is the best time to visit Pohang?",
        answer:
          "Spring (April-May) and Fall (September-November) offer the best weather with mild temperatures and clear skies. Summer (June-August) is warm and great for beaches but can be humid. Winter (December-February) is cold but perfect for the famous Homigot sunrise and gwamegi season.",
      },
      {
        question: "What happens if it rains?",
        answer:
          "Light rain doesn't stop us — we'll provide rain gear and adjust the itinerary if needed. In case of severe weather (heavy rain, storms, extreme cold), we'll offer to reschedule or provide a full refund. Your safety always comes first.",
      },
    ],
  },
  {
    category: "About Us",
    emoji: "🦦",
    items: [
      {
        question: "Are you a licensed tour guide?",
        answer:
          "Yes! Our guide holds an official Korean government Tour Interpreter Guide license (관광통역안내사). This is the highest-level guide certification in Korea, requiring passing a national exam covering Korean history, culture, and tourism law.",
      },
      {
        question: "Is travel insurance included?",
        answer:
          "We carry liability insurance for all tour activities. However, we strongly recommend that you purchase your own travel insurance before visiting Korea to cover any medical emergencies, trip cancellations, or lost luggage.",
      },
      {
        question: "How can I contact you?",
        answer:
          "WhatsApp is the fastest way to reach us. You can also email us at hello@pohangsudal.com. We typically respond within a few hours during Korean business hours (9 AM - 9 PM KST).",
      },
    ],
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-dark text-sm sm:text-base pr-4">
          {item.question}
        </span>
        <span
          className={`text-sky shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-gray-500 text-sm leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-pink text-xs tracking-[0.3em] uppercase font-medium">
            Support
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-dark mt-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Everything you need to know about our tours, booking, and visiting
            Pohang. Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/booking" className="text-sky hover:text-pink underline">
              Contact us
            </Link>
            .
          </p>
        </div>

        {/* FAQ sections */}
        <div className="space-y-8">
          {faqs.map((section) => (
            <div key={section.category}>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{section.emoji}</span>
                <h2 className="font-serif text-xl text-dark">{section.category}</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6">
                {section.items.map((item) => (
                  <FAQAccordion key={item.question} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center hero-gradient rounded-2xl p-8 text-white">
          <h3 className="font-serif text-2xl mb-3">Still have questions?</h3>
          <p className="text-white/80 mb-6">
            We&apos;re here to help! Reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/booking"
              className="bg-white text-dark px-8 py-3 rounded-full font-medium hover:bg-pink-pale transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/survey"
              className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Help Me Choose a Tour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
