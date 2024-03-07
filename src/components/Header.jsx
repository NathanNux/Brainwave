import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { brainwave } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Header = () => {
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const navRef = useRef(null);
  const linkRefs = useRef([]);
  // open array [] needs to be there, the links are from constants and they are not changing - so this will store the indexes of the links
  // links are referenced differenlty, it is not a single element, it is an array of elements but in index from another file

  const timeline = useRef(gsap.timeline({ paused: true }));

    useEffect(() => {
        if (window.matchMedia("(max-width: 1024px)").matches) {
            if (timeline.current.getChildren().length === 0) {
                timeline.current
                    .fromTo(
                        navRef.current,
                        { scaleX: 0, scaleY: 0, transformOrigin: "right top" },
                        { scaleX: 1, scaleY: 1, ease: "power2.inOut", duration: 1 }
                    )
                    .fromTo(
                        linkRefs.current,
                        { autoAlpha: 0 },
                        { autoAlpha: 1, stagger: 0.1, ease: "power2.inOut", duration: 1 },
                        "-=0.75"
                        //this plays 0.75 seconds after the previous animation => making then more smooth

                    )
                    .reverse()
                    .pause();
            }
        } else {
            gsap.set(linkRefs.current, { autoAlpha: 1 });
        }
    }, []);

    useEffect(() => {
        if (window.matchMedia("(min-width: 1025px)").matches) {
            linkRefs.current.forEach((link) => {
                const underline = link.querySelector(".underline");

                gsap.set(underline, { scaleX: 0, transformOrigin: "center", width: "100%" });

                link.addEventListener("mouseenter", () => {
                    gsap.to(underline, { scaleX: 1, duration: 0.3 });
                });

                link.addEventListener("mouseleave", () => {
                    gsap.to(underline, { scaleX: 0, duration: 0.3 });
                });
            });

            // the anim starts at widht 0 making it invisible, then on hover it scales to 1 making it visible and it does from transformOrigin center to widht 100% making it look like it is growing from the center - you can change those to right or left also
        }
    }, []);

    // to create gsap anim create timeline for longer animation like sidemenu or hero section for example when on view or scroll - for shorter animations use gsap.to or gsap.fromTo - it is more efficient

    //for links and texts what does something hover, even on buttons, create addEventListener and then what type it is and then what it does - it is more efficient than using css hover, because it is more flexible and you can do more with it

    // you can also form the gsap syntax as normal function and then call it in useEffect - it is more efficient and cleaner

    const toggleNavigation = () => {
        if (openNavigation) {
            timeline.current.reverse();
            setTimeout(() => {
                setOpenNavigation(false);
                enablePageScroll();
            }, 1500);
        } else {
            setOpenNavigation(true);
            disablePageScroll();
            timeline.current.play();
        }
    };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="Brainwave" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item, index) => (
              <a 
                key={item.id}
                href={item.url}
                onClick={handleClick}
                ref={(el) => (linkRefs.current[index] = el)}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                // the className is so long because it combinates settigs for looks on desktop and mobile - it is saying if the first setting is on mobile then it is hidden on desktop and vice versa + its setting different font sizes and colors for different screens
              >
                {item.title}
                <div className="underline h-[0.5px] bg-n-1 w-0"></div>
              </a>
            ))}
          </div>

          <HamburgerMenu ref={navRef}/>
        </nav>

        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New account
        </a>
        <Button className="hidden lg:flex" href="#login">
          Sign in
        </Button>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;