import { Mail, MapPin, Phone } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Get in Touch</h2>
      <p className="text-gray-600">
        Have questions about our plans or need custom solutions? Our team is
        here to help.
      </p>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary" />
          <span>support@newsclocker.com</span>
        </div>
        {/* <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-primary" />
          <span>+1 (555) 123-4567</span>
        </div> */}
        {/* <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-primary" />
          <span>123 News Street, San Francisco, CA 94105</span>
        </div> */}
      </div>
    </div>
  );
}
