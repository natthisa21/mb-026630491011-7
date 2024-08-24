import React, { useState } from 'react';
import Header from './Header'; // นำเข้าคอมโพเนนต์ Header
import Footer from './Footer'; // นำเข้าคอมโพเนนต์ Footer
import MyPetShow from './MyPetShow'; // นำเข้าคอมโพเนนต์ MyPetShow

// กำหนดรูปแบบข้อมูลฟอร์มด้วย TypeScript Interface
interface FormData {
  petName: string;
  birthDate: string;
  category: string;
  sex: string;
  description: string;
  ownerName: string;
  email: string;
  image: File | null; // ใช้ File หรือ null สำหรับรูปภาพ
}

// ค่าพื้นฐานสำหรับข้อมูลฟอร์ม
const initialFormData: FormData = {
  petName: '',
  birthDate: '',
  category: 'Other',
  sex: 'Other',
  description: '',
  ownerName: '',
  email: '',
  image: null,
};

// ค่าพื้นฐานสำหรับข้อผิดพลาดที่อาจเกิดขึ้นในฟอร์ม
const initialErrors = {
  petName: '',
  birthDate: '',
  ownerName: '',
  email: '',
};

// คอมโพเนนต์สำหรับฟิลด์อินพุต (input) ทั่วไป
const InputField: React.FC<{ name: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string }> = ({ name, type = 'text', value, onChange, error }) => (
  <div>
    <label className="block font-semibold">{name}:</label>
    <input type={type} name={name} value={value} onChange={onChange} className="border p-2 w-full" />
    {error && <span className="text-red-500">{error}</span>} {/* แสดงข้อความข้อผิดพลาดถ้ามี */}
  </div>
);

// คอมโพเนนต์สำหรับกลุ่มปุ่มวิทยุ (radio buttons)
const RadioGroup: React.FC<{ name: string; options: string[]; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ name, options, value, onChange }) => (
  <div>
    <label className="block font-semibold">{name}:</label>
    <div className="space-x-4">
      {options.map(option => (
        <label key={option}>
          <input type="radio" name={name} value={option} checked={value === option} onChange={onChange} />
          {option}
        </label>
      ))}
    </div>
  </div>
);

// คอมโพเนนต์หลักสำหรับฟอร์มสัตว์เลี้ยง
const MyPetForm: React.FC = () => {
  // สถานะของข้อมูลฟอร์ม
  const [formData, setFormData] = useState<FormData>(initialFormData);
  // สถานะของข้อผิดพลาด
  const [errors, setErrors] = useState(initialErrors);
  // สถานะของข้อมูลที่ถูกส่ง
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  // ฟังก์ชันตรวจสอบความถูกต้องของข้อมูลฟอร์ม
  const validate = (): boolean => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.petName) {
      newErrors.petName = 'Please enter your pet\'s name'; // ข้อความข้อผิดพลาดสำหรับชื่อสัตว์เลี้ยง
      isValid = false;
    }
    if (!formData.birthDate) {
      newErrors.birthDate = 'Please select a birth date'; // ข้อความข้อผิดพลาดสำหรับวันเกิด
      isValid = false;
    }
    if (!formData.ownerName) {
      newErrors.ownerName = 'Please enter your name'; // ข้อความข้อผิดพลาดสำหรับชื่อเจ้าของ
      isValid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'; // ข้อความข้อผิดพลาดสำหรับอีเมล
      isValid = false;
    }

    setErrors(newErrors); // อัปเดตข้อผิดพลาด
    return isValid; // คืนค่าผลลัพธ์การตรวจสอบ
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    if (validate()) {
      setSubmittedData(formData); // ถ้าข้อมูลถูกต้อง ให้เก็บข้อมูลที่กรอก
    }
  };

  // ฟังก์ชันจัดการการรีเซ็ตฟอร์ม
  const handleReset = () => {
    setFormData(initialFormData); // รีเซ็ตข้อมูลฟอร์ม
    setErrors(initialErrors); // รีเซ็ตข้อผิดพลาด
    setSubmittedData(null); // รีเซ็ตข้อมูลที่ถูกส่ง
  };

  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูล
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'image' ? (files ? files[0] : null) : value, // อัปเดตค่าของฟิลด์ที่เลือก
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* แสดงคอมโพเนนต์ Header */}
      <main className="flex-grow py-8 px-4 bg-gray-100">
        <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
          {submittedData ? ( // ถ้ามีข้อมูลที่ถูกส่งให้แสดง MyPetShow
            <MyPetShow data={submittedData} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">ข้อมูลสัตว์เลี้ยง</h2>

              {/* ฟิลด์สำหรับชื่อสัตว์เลี้ยง */}
              <InputField name="petName" value={formData.petName} onChange={handleChange} error={errors.petName} />
              {/* ฟิลด์สำหรับวันเกิด */}
              <InputField name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} error={errors.birthDate} />
              
              {/* ฟิลด์สำหรับประเภทของสัตว์ */}
              <div>
                <label className="block font-semibold">ประเภท:</label>
                <select name="category" value={formData.category} onChange={handleChange} className="border p-2 w-full">
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* ฟิลด์สำหรับเพศของสัตว์ */}
              <RadioGroup name="sex" options={['Male', 'Female', 'Other']} value={formData.sex} onChange={handleChange} />

              {/* ฟิลด์สำหรับรายละเอียดเพิ่มเติม */}
              <div>
                <label className="block font-semibold">รายละเอียดเพิ่มเติม:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" />
              </div>

              {/* ฟิลด์สำหรับอัปโหลดรูปภาพสัตว์ */}
              <div>
                <label className="block font-semibold">อัพโหลดรูปสัตว์เลี้ยง:</label>
                <input type="file" name="image" accept="image/*" onChange={handleChange} className="border p-2 w-full" />
              </div>

              <h2 className="text-2xl font-bold mb-4">ข้อมูลเจ้าของ</h2>

              {/* ฟิลด์สำหรับชื่อเจ้าของ */}
              <InputField name="Name" value={formData.ownerName} onChange={handleChange} error={errors.ownerName} />
              {/* ฟิลด์สำหรับอีเมลเจ้าของ */}
              <InputField name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />

              {/* ปุ่มสำหรับส่งฟอร์มและรีเซ็ตฟอร์ม */}
              <div className="space-x-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                <button type="button" onClick={handleReset} className="bg-gray-500 text-white px-4 py-2 rounded">Reset</button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer /> {/* แสดงคอมโพเนนต์ Footer */}
    </div>
  );
};

export default MyPetForm; // ส่งออกคอมโพเนนต์ MyPetForm