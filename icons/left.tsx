import { SVGProps } from "react";
const Left = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path d="M8.75 0.75L0.75 8.75L8.75 16.75" stroke="currentColor" />
  </svg>
);
export default Left;
