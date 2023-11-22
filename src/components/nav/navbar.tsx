"use client";
import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const NavBar = () => {
  const navRef = useRef<HTMLElement>(null!);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, { y: "-100%" }, { y: "0%" });
    }, navRef);

    return () => ctx.revert();
  }, []);
  return (
    <nav ref={navRef} className="z-20 relative px-16 py-8 flex justify-between">
      <Link className="font-bold" href={"/"}>
        Sphere
      </Link>
      <ul className="flex gap-16">
        <li>Explore</li>
        <li>Create</li>
      </ul>
    </nav>
  );
};

export default NavBar;
