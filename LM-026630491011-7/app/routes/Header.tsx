import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#f5f5dc] text-black py-4 shadow-md">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold">PetCare</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-gray-800">หน้าแรก</a></li>
            <li><a href="/MyPetForm" className="hover:text-gray-800">สัตว์เลี้ยง</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
