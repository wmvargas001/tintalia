const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/tintalia.co",
    icon: (
      <path d="M12 2.2c2.7 0 3 0 4.1.06 1 .05 1.6.2 2 .35.5.2.9.4 1.3.8.4.4.6.8.8 1.3.15.4.3 1 .35 2 .05 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1-.2 1.6-.35 2a3.5 3.5 0 0 1-.8 1.3 3.5 3.5 0 0 1-1.3.8c-.4.15-1 .3-2 .35-1.1.05-1.4.06-4.1.06s-3 0-4.1-.06c-1-.05-1.6-.2-2-.35a3.5 3.5 0 0 1-1.3-.8 3.5 3.5 0 0 1-.8-1.3c-.15-.4-.3-1-.35-2C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1 .2-1.6.35-2 .2-.5.4-.9.8-1.3.4-.4.8-.6 1.3-.8.4-.15 1-.3 2-.35C9 2.2 9.3 2.2 12 2.2Zm0 1.8c-2.65 0-2.96 0-4 .06-.82.04-1.26.17-1.55.28-.39.15-.67.33-.96.62-.29.29-.47.57-.62.96-.11.29-.24.73-.28 1.55-.05 1.04-.06 1.35-.06 4s0 2.96.06 4c.04.82.17 1.26.28 1.55.15.39.33.67.62.96.29.29.57.47.96.62.29.11.73.24 1.55.28 1.04.05 1.35.06 4 .06s2.96 0 4-.06c.82-.04 1.26-.17 1.55-.28.39-.15.67-.33.96-.62.29-.29.47-.57.62-.96.11-.29.24-.73.28-1.55.05-1.04.06-1.35.06-4s0-2.96-.06-4c-.04-.82-.17-1.26-.28-1.55a2.6 2.6 0 0 0-.62-.96 2.6 2.6 0 0 0-.96-.62c-.29-.11-.73-.24-1.55-.28-1.04-.05-1.35-.06-4-.06Zm0 3.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/tintalia.co",
    icon: (
      <path d="M13.5 21v-7.4h2.5l.37-2.9h-2.87V8.8c0-.84.23-1.4 1.44-1.4h1.54V4.8c-.27-.04-1.18-.12-2.24-.12-2.22 0-3.74 1.35-3.74 3.84v2.14H8v2.9h2.5V21h3Z" />
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@tintalia.co",
    icon: (
      <path d="M16.6 2h-2.8v13.2a2.6 2.6 0 1 1-2.6-2.7c.24 0 .48.03.7.08V9.6a5.4 5.4 0 1 0 4.7 5.4V8.2a6.6 6.6 0 0 0 3.9 1.3V6.7A3.9 3.9 0 0 1 16.6 2Z" />
    ),
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-4">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-brand-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            {social.icon}
          </svg>
        </a>
      ))}
    </div>
  );
}
