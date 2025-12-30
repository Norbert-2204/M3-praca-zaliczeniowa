import { SVGProps } from "react";
const CheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100"
    height="100"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="none"
    {...props}
  >
    <path
      d="M70.8333 37.5L41.6666 66.6667L29.1664 54.1667M87.5 50C87.5 70.7107 70.7107 87.5 50 87.5C29.2893 87.5 12.5 70.7107 12.5 50C12.5 29.2893 29.2893 12.5 50 12.5C70.7107 12.5 87.5 29.2893 87.5 50Z"
      stroke="currentColor"
    />
  </svg>
);
export default CheckCircle;
