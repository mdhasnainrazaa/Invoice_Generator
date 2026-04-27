import { useState } from "react";
import Form from "./components/Form";
import Preview from "./components/Preview";

export default function App() {
  const [data, setData] = useState({});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100 min-h-screen">
      <Form setData={setData} />
      <Preview data={data} />
    </div>
  );
}
