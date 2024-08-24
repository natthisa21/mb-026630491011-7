import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f5dc] text-black py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-lg font-bold mb-2">จัดทำโดย</h2>
            <p>
              ณัฐธิสา สุขศรีสันต์
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
