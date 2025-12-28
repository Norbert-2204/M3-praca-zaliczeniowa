import Image from "next/image";

const Footer = () => {
  const badges = [
    "https://i.ibb.co/JR3Z4DpJ/Badge-1.png",
    "https://i.ibb.co/6Cg4Jt8/Badge-2.png",
    "https://i.ibb.co/Hpk67781/Badge-3.png",
    "https://i.ibb.co/5xc71v94/Badge-4.png",
    "https://i.ibb.co/HDL3hc3j/Badge.png",
  ];

  return (
    <footer className="px-15 py-[140px] bg-[#222327] flex flex-col xl:flex-row  justify-center xl:justify-between items-start ">
      <div className="flex flex-col gap-6 items-start">
        <h1 className="text-4xl font-bold ">
          <span className="text-[#F29145]">Nexus</span>
          <span>Hub</span>
        </h1>
        <h2>© 2023 NexusHub. All rights reserved.</h2>
        <div className="flex gap-3 flex-wrap">
          {badges.map((src, idx) => (
            <div key={idx} className="relative w-16 h-12">
              <Image
                src={src}
                alt={`badge-${idx}`}
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <nav className="flex flex-col justify-center gap-1 lg:flex-row">
        <div className="flex flex-col gap-8">
          <h2 className="text-[20px] font-bold">Company</h2>
          <div className="flex flex-col gap-4 w-[191px]">
            <a className="cursor-pointer">About Us</a>
            <a className="cursor-pointer">Contact</a>
            <a className="cursor-pointer">Partner </a>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="text-[20px] font-bold">Social</h2>
          <div className="flex flex-col gap-4 w-[191px]">
            <a className="cursor-pointer">Instagram</a>
            <a className="cursor-pointer">Twitter</a>
            <a className="cursor-pointer">Facebook</a>
            <a className="cursor-pointer">LinkedIn</a>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="text-[20px] font-bold">FAQ</h2>
          <div className="flex flex-col gap-4 w-[191px]">
            <a className="cursor-pointer">Account</a>
            <a className="cursor-pointer">Deliveries</a>
            <a className="cursor-pointer">Orders</a>
            <a className="cursor-pointer">Payments</a>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="text-[20px] font-bold">Resources</h2>
          <div className="gap-4 flex flex-col w-[191px]">
            <a className="cursor-pointer">E-books</a>
            <a className="cursor-pointer">Tutorials</a>
            <a className="cursor-pointer">Course</a>
            <a className="cursor-pointer">Blog</a>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
