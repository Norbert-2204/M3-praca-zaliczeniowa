import { SVGProps } from "react";
const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path d="M7 12L17 12M7 12L11 8M7 12L11 16" stroke="currentColor" />
  </svg>
);
export default ArrowLeft;
