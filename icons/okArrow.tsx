import { SVGProps } from "react";
const OkArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="12"
    height="12"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 8"
    fill="none"
    {...props}
  >
    <path
      d="M12.6748 0.675049L4.42488 8.92502L0.674805 5.17505"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default OkArrow;
