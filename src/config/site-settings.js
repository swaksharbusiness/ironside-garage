export const SITE_CONFIG = {
  business: {
    name: "IRONSIDE",
    subName: "GARAGE",
    phone: "(555) 123-4567",
    smsLink: "sms:+15551234567",
    mapLink: "https://maps.google.com",
    leadTime: "3–5 DAYS OUT",
    isOpen: true
  },
  services: [
    { id: 'diag', name: "Quick Diagnostic", price: "$75", icon: 'Gauge' },
    { id: 'oil', name: "Oil Change", price: "$95", icon: 'Droplet' },
    // ... rest of services
  ],
  features: {
    enableBooking: true,
    enableBuildGallery: true
  }
};