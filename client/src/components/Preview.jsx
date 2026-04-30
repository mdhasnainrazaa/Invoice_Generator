import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function Preview({ data }) {
  const year = new Date().getFullYear();
  const receiptNo = `${data.prefix || "KTC"}-${year}-001${data.suffix ? "-" + data.suffix : ""}`;

  const totalAmount = Number(data.totalAmount || 0);
  const paidAmount = Number(data.paidAmount || 0);
  const dueAmount = totalAmount - paidAmount;

  const downloadPDF = async () => {
    const element = document.getElementById("receipt");
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#f4faff"
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 20) / imgHeight);
    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    pdf.addImage(imgData, 'PNG', 10, 10, finalWidth, finalHeight);
    pdf.save(`receipt-${receiptNo}.pdf`);
  };

  return (
    <div className="bg-white p-2 md:p-4 rounded-xl shadow overflow-x-auto">
      <div id="receipt" className="min-w-[300px] relative px-6 py-4 bg-[#f4faff]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src="/logo.jpeg" alt="Logo" className="w-56 object-contain" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-800">info@kodetocareer.in</p>
            <p className="text-[10px] text-gray-500">Delhi</p>
          </div>
        </div>

        <hr className="my-4" />

        <p><b>Receipt No:</b> {receiptNo}</p>
        <p><b>Date:</b> {new Date().toDateString()}</p>

        <hr className="my-4" />

        <p><b>Name:</b> {data.name}</p>
        <p><b>Course:</b> {data.course}</p>

        <hr className="my-4" />

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span>Total Amount</span>
            <span>₹ {totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-1">
            <span>Amount Paid</span>
            <span className="text-green-600">₹ {paidAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2">
            <span>Balance Due</span>
            <span className={dueAmount > 0 ? "text-red-600" : "text-gray-800"}>₹ {dueAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        <div className="mt-4 bg-[#0a192f] p-3 rounded-md flex justify-between items-center">
          <span className="text-white font-bold">Transaction Status</span>
          <span className={`font-bold text-lg ${dueAmount === 0 ? "text-green-500" : "text-yellow-500"}`}>
            {dueAmount === 0 ? "FULLY PAID" : "PARTIALLY PAID"}
          </span>
        </div>

        <hr className="my-4" />

        <p><b>Payment Mode:</b> {data.paymentMode}</p>
        {data.paymentMode !== 'Due' && <p><b>Transaction ID:</b> {data.transactionId}</p>}

        <p className="text-xs text-center mt-4">
          This is a system-generated receipt
        </p>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-xs font-bold text-blue-900 uppercase mb-2 tracking-wide">Terms & Conditions</h3>
          <ul className="text-[10px] text-gray-600 space-y-1 list-none p-0">
            <li>1. Fees once paid are non-refundable.</li>
            <li>2. For any queries, contact us at info@kodetocareer.com</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center gap-4 border border-blue-100">
          <div className="flex-shrink-0">
            <img src="/logo.jpeg" alt="Logo" className="w-20 object-contain" />
          </div>
          <div>
            <p className="text-sm text-blue-900">Thank you for choosing Kodetocareer.</p>
            <p className="text-sm text-blue-900">We appreciate your trust in us.</p>
            <p className="text-sm font-bold text-blue-900 mt-1">Keep Learning, Keep Growing!</p>
          </div>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="bg-green-600 text-white w-full py-2 mt-4 rounded"
      >
        Download PDF
      </button>
    </div>
  );
}
