import React from 'react';
import './Partners.css';

const Partners = () => {
  const partners = [
    { 
      id: 1, 
      logo: "https://i.ibb.co/D9dLX2R/images-q-tbn-ANd9-Gc-QDYA0mh-FNAfz-FTKy-Lkw-Un-t8o-Dva-W-g-T-R2-Q-s.png", 
      name: 'Pathao Courier', 
      description: "Reliable and fast delivery service partner for logistics." 
    },
    { 
      id: 2, 
      logo: "https://i.ibb.co/8zhYmDL/651548cae8ac3849400a0da0-Shikho-Logo-02-01-removebg-preview.png", 
      name: 'Shikho', 
      description: "Empowering students with modern education tools." 
    },
    { 
      id: 3, 
      logo: "https://i.ibb.co/KFsLZp8/images-q-tbn-ANd9-Gc-TUbc-BSSHJHOWGB6o-ACBBtb-xk-Yv-XKZn-ZYV7-A-s.png", 
      name: 'UCB', 
      description: "Banking partner for secure and reliable transactions." 
    },
    { 
      id: 4, 
      logo: "https://i.ibb.co/FD18j89/images-q-tbn-ANd9-Gc-T-Zjvi-UDpti-VQI7q-IDOr-DIo-Fv-V0-Z0w-W9gs7g-s.png", 
      name: 'Boshundhara', 
      description: "Committed to creating quality materials for students." 
    },
    { 
      id: 5, 
      logo: "https://i.ibb.co/H4CGkn3/images-q-tbn-ANd9-Gc-Sh-B-9f-KPENE9q-OFAe-YLn-2je-Gl-X2-Zrs-PCl-Nw-s.jpg", 
      name: 'Robi', 
      description: "Partnering to enhance digital connectivity and education." 
    },
    { 
      id: 6, 
      logo: "https://i.ibb.co/rxhLN1X/grameen-13893-portrait-medium.jpg", 
      name: 'Grameen Bank', 
      description: "Financial partner supporting educational growth." 
    },
    { 
      id: 7, 
      logo: "https://i.ibb.co/4g562R1/programminghero-logo-e-2147483647-v-beta-t-O2cmd-NNJwz-Myps-L2kzlh-Pe-Fy4n-Butsae-OYG0-Tm3t-Iqw.jpg", 
      name: 'Programming Hero', 
      description: "Providing modern programming education and resources." 
    },
  ];

  return (
    <div className="partner-carousel w-3/5 mx-auto my-10 mb-20 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-teal-500 mb-5">
        Our Partners
      </h2>
      <div className="partner-track flex text-center gap-5 w-fit">
        {partners.map((partner) => (
          <div key={partner.id} className="partner-logo flex-shrink-0 flex flex-col justify-center items-center border-2 border-teal-400 bg-teal-50 rounded-xl py-2 w-80">
            <img src={partner.logo} alt={partner.name} className='w-1/3 h-16 rounded-xl' />
            <p className='w-3/3 px-2'>{partner.description}</p>            
          </div>

        ))}
      </div>
    </div>
  );
};

export default Partners;