import { Metadata } from "next";
import { ContactForm } from "./components/contact-form";
import { ContactInfo } from "./components/contact-info";
import { contactMetadata } from "@/lib/metadata/contact-metadata";

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            {`We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.`}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
