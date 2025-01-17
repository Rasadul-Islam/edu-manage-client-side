import React from 'react';
import './Partners.css';

const Partners = () => {
  const partners = [
    { id: 1, logo: "https://i.ibb.co/D9dLX2R/images-q-tbn-ANd9-Gc-QDYA0mh-FNAfz-FTKy-Lkw-Un-t8o-Dva-W-g-T-R2-Q-s.png", name: 'Partner 1' },
    { id: 2, logo: "https://i.ibb.co/8zhYmDL/651548cae8ac3849400a0da0-Shikho-Logo-02-01-removebg-preview.png", name: 'Partner 2' },
    { id: 3, logo: "https://i.ibb.co/KFsLZp8/images-q-tbn-ANd9-Gc-TUbc-BSSHJHOWGB6o-ACBBtb-xk-Yv-XKZn-ZYV7-A-s.png", name: 'Partner 3' },
    { id: 4, logo: "https://i.ibb.co/FD18j89/images-q-tbn-ANd9-Gc-T-Zjvi-UDpti-VQI7q-IDOr-DIo-Fv-V0-Z0w-W9gs7g-s.png", name: 'Partner 4' },
    { id: 5, logo: "https://i.ibb.co/H4CGkn3/images-q-tbn-ANd9-Gc-Sh-B-9f-KPENE9q-OFAe-YLn-2je-Gl-X2-Zrs-PCl-Nw-s.jpg", name: 'Partner 5' },
    { id: 6, logo: "https://i.ibb.co/rxhLN1X/grameen-13893-portrait-medium.jpg", name: 'Partner 6' },
    { id: 7, logo: "https://i.ibb.co/4g562R1/programminghero-logo-e-2147483647-v-beta-t-O2cmd-NNJwz-Myps-L2kzlh-Pe-Fy4n-Butsae-OYG0-Tm3t-Iqw.jpg", name: 'Partner 7' },
  ];

  return (
    <div className="partner-carousel w-3/5 mx-auto my-5 relative overflow-hidden">
      <div className="partner-track">
        {partners.map((partner) => (
          <div key={partner.id} className="partner-logo">
            <img src={partner.logo} alt={partner.name} />
          </div>
        ))}
        {/* Duplicate the partner logos for seamless looping */}
        {partners.map((partner) => (
          <div key={`duplicate-${partner.id}`} className="partner-logo">
            <img src={partner.logo} alt={partner.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
