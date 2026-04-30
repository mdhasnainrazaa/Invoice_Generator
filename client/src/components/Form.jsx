import { useState } from "react";

export default function Form({ setData }) {
  const [form, setForm] = useState({
    prefix: "KTC",
    suffix: Math.floor(1000 + Math.random() * 9000).toString(),
    name: "",
    course: "",
    totalAmount: "",
    paidAmount: "",
    paymentMode: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    const newSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    setForm(prev => ({ ...prev, suffix: newSuffix }));
    setData({ ...form, suffix: newSuffix });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Receipt Form</h2>

      <input name="name" placeholder="Student Name" className="input" onChange={handleChange} />
      <input name="course" placeholder="Course" className="input" onChange={handleChange} />

      <input name="totalAmount" placeholder="Total Amount" className="input" onChange={handleChange} />
      <input name="paidAmount" placeholder="Paid Amount" className="input" onChange={handleChange} />

      <select name="paymentMode" className="input" onChange={handleChange}>
        <option value="">Select Payment Mode</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
        <option value="Due">Due Payment</option>
      </select>

      <input name="transactionId" placeholder="Transaction ID" className="input" onChange={handleChange} />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 text-white w-full py-2 rounded mt-4"
      >
        Generate
      </button>
    </div>
  );
}
