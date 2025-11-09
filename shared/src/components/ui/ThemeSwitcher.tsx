// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { Moon, Sun } from "lucide-react";
// import { flushSync } from "react-dom";
// import { useTheme } from "next-themes";
// import Button from "./Button";

// interface ThemeSwitcherProps {
//   duration?: number;
// }

// const ThemeSwitcher = ({ duration = 400 }: ThemeSwitcherProps) => {
//   const [isDark, setIsDark] = useState(false);
//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const { setTheme } = useTheme();

//   useEffect(() => {
//     const updateTheme = () => {
//       const darkMode = document.documentElement.classList.contains("dark");
//       setIsDark(darkMode);
//     };

//     updateTheme();

//     const observer = new MutationObserver(updateTheme);
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });

//     return () => observer.disconnect();
//   }, []);

//   const toggleTheme = useCallback(async () => {
//     if (!buttonRef.current) return;

//     await document.startViewTransition(() => {
//       flushSync(() => {
//         const newTheme = !isDark;
//         setIsDark(newTheme);
//         setTheme(newTheme ? "dark" : "light");
//       });
//     }).ready;

//     const { top, left, width, height } =
//       buttonRef.current.getBoundingClientRect();
//     const x = left + width / 2;
//     const y = top + height / 2;
//     const maxRadius = Math.hypot(
//       Math.max(left, window.innerWidth - left),
//       Math.max(top, window.innerHeight - top)
//     );

//     document.documentElement.animate(
//       {
//         clipPath: [
//           `circle(0px at ${x}px ${y}px)`,
//           `circle(${maxRadius}px at ${x}px ${y}px)`,
//         ],
//       },
//       {
//         duration,
//         easing: "ease-in-out",
//         pseudoElement: "::view-transition-new(root)",
//       }
//     );
//   }, [isDark, duration, setTheme]);

//   return (
//     <Button ref={buttonRef} variant="icon" size="icon" onClick={toggleTheme}>
//       {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   );
// };

// export default ThemeSwitcher;
