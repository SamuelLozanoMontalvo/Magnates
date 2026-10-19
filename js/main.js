/**
 * MAGNATES — Main Entry Point
 */

import { TECH_STACK, SERVICES, ICONS, CONTACT_SERVICES } from "./data.js";
import { initMarquee } from "./marquee.js";
import { initServices } from "./services.js";
import { initContactForm } from "./form.js";
import { initHero3D } from "./hero-3d.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Technology Marquee
  initMarquee("mqs", TECH_STACK);

  // 2. Initialize Services Grid & Spotlight Effect
  initServices("sv", SERVICES, ICONS);

  // 3. Initialize Contact Form & Service Choice Tags
  initContactForm("fm", "ch", CONTACT_SERVICES);

  // 4. Initialize Scroll-Driven 3D Canvas
  initHero3D();

  // 5. Scroll Reveal Intersection Observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("on");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".rv-in").forEach((element) => {
    revealObserver.observe(element);
  });
});
