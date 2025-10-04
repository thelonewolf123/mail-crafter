import {
  Hexagon,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  MailCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const logo = <MailCheck className="h-10 w-10" />;
const brandName = "Mail Crafter";
const socialLinks = [
  {
    icon: <Instagram className="h-5 w-5" />,
    href: "https://www.instagram.com/himal_official/",
    label: "Instagram",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://www.linkedin.com/in/himal-b-180b701a5/",
    label: "Linkedin",
  },
];
const mainLinks = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];
const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];
const copyright = {
  text: `© ${new Date().getFullYear()} Mail Crafter`,
  license: "All rights reserved",
};

export function Footer() {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24 bg-background border-t">
      <div className="px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
          <a
            href="/"
            className="flex items-center gap-x-2"
            aria-label={brandName}
          >
            {logo}
            <span className="font-bold text-xl">{brandName}</span>
          </a>
          <ul className="flex list-none space-x-3 justify-center md:justify-end">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t mt-8 pt-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-sm leading-6 text-muted-foreground whitespace-nowrap">
              <div>{copyright.text}</div>
              {copyright.license && <div>{copyright.license}</div>}
            </div>
          </div>
          <nav className="flex flex-col items-center md:items-center">
            <ul className="list-none flex flex-wrap justify-center gap-4">
              {mainLinks.map((link, i) => (
                <li key={i} className="shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col items-center md:items-end">
            <ul className="list-none flex flex-wrap justify-center gap-4">
              {legalLinks.map((link, i) => (
                <li key={i} className="shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
