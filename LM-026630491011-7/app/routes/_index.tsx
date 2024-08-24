import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-4 bg-gray-100">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">แนะนำตัว</h1>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold w-32">ชื่อ-นามสกุล:</span>
              <span className="text-gray-700">Natthisa Suksrisun</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">รหัสนักศึกษา:</span>
              <span className="text-gray-700">026630491011-7</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">อีเมล:</span>
              <span className="text-gray-700">natthisa.suk@rmutto.ac.th</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-32">เบอร์โทรศัพท์:</span>
              <span className="text-gray-700">
                <a className="text-blue-600 hover:underline">0958590286</a>
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;