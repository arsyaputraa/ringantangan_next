import mainLogo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroParallax } from "./_components/hero-parallax";
import post1 from "@/assets/images/ig/post_1.jpg";
import post2 from "@/assets/images/ig/post_2.jpg";

import post3 from "@/assets/images/ig/post_3.jpg";

import post4 from "@/assets/images/ig/post_4.jpg";
import post5 from "@/assets/images/ig/post_5.webp";
import { TypewriterCTA } from "./_components/typewriter-cta";

const dummyPosts = [
  {
    title: "Love Donation",
    link: "https://www.instagram.com/p/ClTZhL-ynD2/",
    thumbnail: post1,
  },
  {
    title: "Ringantangan X Permata Jonggol",
    link: "https://cursor.so",
    thumbnail: post2,
  },
  {
    title: "Nostalgia Ramadhan",
    link: "https://userogue.com",
    thumbnail: post3,
  },

  {
    title: "Lentera Ramadhan",
    link: "https://editorially.org",
    thumbnail: post4,
  },
  {
    title: "Ringantangan X JTown Festival",
    link: "https://editrix.ai",
    thumbnail: post5,
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

export default async function Home() {
  return (
    <>
      <HeroParallax posts={dummyPosts} />
      <TypewriterCTA />
    </>
  );
}
