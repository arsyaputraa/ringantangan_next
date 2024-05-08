"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  posts,
}: {
  posts: {
    title: string;
    link: string;
    thumbnail: string | StaticImageData;
  }[];
}) => {
  const firstRow = posts.slice(0, 3);
  const secondRow = posts.slice(2, 6);
  const thirdRow = posts.slice(6, 9);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [30, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 350]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[350vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((post) => (
            <PostCard post={post} translate={translateX} key={post.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((post) => (
            <PostCard
              post={post}
              translate={translateXReverse}
              key={post.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((post) => (
            <PostCard post={post} translate={translateX} key={post.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Ringantangan <br />{" "}
        <span className="text-xl md:text-5xl">Social Organization</span>
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
        reprehenderit expedita, aspernatur, eos possimus dolorum earum ducimus,
        modi est qui commodi enim obcaecati odio rem veniam! Earum obcaecati eos
        exercitationem?
      </p>
    </div>
  );
};

export const PostCard = ({
  post,
  translate,
}: {
  post: {
    title: string;
    link: string;
    thumbnail: string | StaticImageData;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={post.title}
      className="group/product h-80 w-[27rem] relative flex-shrink-0"
    >
      <Link
        href={post.link}
        target="_blank"
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={post.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={post.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {post.title}
      </h2>
    </motion.div>
  );
};
