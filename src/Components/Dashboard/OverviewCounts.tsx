"use client";

import {
  FaSatellite,
  FaRocket,
  FaQuestionCircle,
  FaBomb,
  FaGlobe,
} from "react-icons/fa";

const OverviewCounts = () => {
  const counts = {
    total: "27893",
    PAYLOAD: "13997",
    "ROCKET BODY": "2167",
    UNKNOWN: "559",
    DEBRIS: "10595",
  };

  const summary = [
    {
      title: "Payloads",
      count: counts.PAYLOAD,
      icon: <FaSatellite size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Rocket Bodies",
      count: counts["ROCKET BODY"],
      icon: <FaRocket size={30} />,
      color: "bg-yellow-400",
    },
    {
      title: "Debris",
      count: counts.DEBRIS,
      icon: <FaBomb size={30} />,
      color: "bg-red-500",
    },
    {
      title: "Unknown",
      count: counts.UNKNOWN,
      icon: <FaQuestionCircle size={30} />,
      color: "bg-gray-500",
    },
  ];

  const satelliteData = [
    { noradCatId: "49771", intlDes: "2021-115AZ", name: "STARLINK-3201" },
    { noradCatId: "49772", intlDes: "2021-115BA", name: "GLOBAL-12" },
    { noradCatId: "49773", intlDes: "2021-115BB", name: "GLOBAL-13" },
    { noradCatId: "49789", intlDes: "1982-092JF", name: "COSMOS 1408 DEB" },
    { noradCatId: "49809", intlDes: "2021-116A", name: "GALILEO 27 (223)" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8  text-white p-4 space-y-6  flex flex-col">

      {/* Summary Counts */}
      <div className="">
        <div className="bg-slate-700 rounded-2xl p-6 flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center">
              <FaGlobe size={28} />
            </div>
            <div>
              <div className="text-2xl text-slate-300">Total Objects</div>
              <div className="text-4xl font-bold">{counts.total}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {summary.map((item, index) => (
            <div
              key={index}
              className="bg-slate-700 rounded-2xl p-5 flex flex-col items-center justify-center"
            >
              <div
                className={`w-18 h-18 rounded-full flex items-center justify-center ${item.color} mb-3`}
              >
                {item.icon}
              </div>
              <div className="text-s text-slate-300">{item.title}</div>
              <div className="text-xl font-semibold mt-1">{item.count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Items Table */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 rounded-3xl bg-slate-700 ">
        <h2 className="text-xl font-semibold mb-4">Selected Items</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800">
              <th className="p-2">NORAD ID</th>
              <th className="p-2">INT{"'"}L DESIGNATOR</th>
              <th className="p-2">NAME</th>
            </tr>
          </thead>
          <tbody>
            {satelliteData.map((satellite, index) => (
              <tr key={index} className="border-b border-slate-600">
                <td className="p-2">{satellite.noradCatId}</td>
                <td className="p-2">{satellite.intlDes}</td>
                <td className="p-2">{satellite.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default OverviewCounts;
