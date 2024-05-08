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
    link: "#",
    thumbnail: post1,
  },
  {
    title: "Ringantangan X Permata Jonggol",
    link: "#",
    thumbnail: post2,
  },
  {
    title: "Nostalgia Ramadhan",
    link: "#",
    thumbnail: post3,
  },

  {
    title: "Lentera Ramadhan",
    link: "#",
    thumbnail: post4,
  },
  {
    title: "Ringantangan X JTown Festival",
    link: "#",
    thumbnail: post5,
  },

  {
    title: "Ringantangan X JTown Festival",
    link: "#",
    thumbnail: post5,
  },

  {
    title: "Lentera Ramadhan",
    link: "#",
    thumbnail: post4,
  },
  {
    title: "Nostalgia Ramadhan",
    link: "#",
    thumbnail: post3,
  },
  {
    title: "Ringantangan X Permata Jonggol",
    link: "#",
    thumbnail: post2,
  },
  {
    title: "Love Donation",
    link: "#",
    thumbnail: post1,
  },
  {
    title: "Nostalgia Ramadhan",
    link: "#",
    thumbnail: post3,
  },
  {
    title: "Lentera Ramadhan",
    link: "#",
    thumbnail: post4,
  },
  {
    title: "Love Donation",
    link: "#",
    thumbnail: post1,
  },
  {
    title: "Ringantangan X Permata Jonggol",
    link: "#",
    thumbnail: post2,
  },

  {
    title: "Ringantangan X JTown Festival",
    link: "#",
    thumbnail: post5,
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
