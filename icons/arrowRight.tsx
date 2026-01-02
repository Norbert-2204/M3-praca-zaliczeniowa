import { SVGProps } from "react";
const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M17 12L7 12M17 12L13 16M17 12L13 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArrowRight;
