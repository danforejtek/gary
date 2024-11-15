import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-dark-blue py-6">
      <div className="container text-xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 gap-6 md:gap-0 md:text-base">
        <div className="text-white text-center md:text-left">
          <p className="font-bold">Coingarage s.r.o.</p>
          <p>Revoluční 1082/8, Nové Město (Praha 1),</p>
          <p>110 00 Prague, Czech Republic</p>
        </div>
        <div className="text-gary-yellow text-center">
          <a href="mailto:support@helpgary.com" className="underline">
            support@helpgary.com
          </a>
        </div>
        <div className="text-white text-center md:text-right">
          <p>&copy; 2024</p>
          <p>
            All Rights Reserved by <strong>HELP GARY</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};
