"use client";

import { useState } from "react";
// import { BsPlusCircle } from "react-icons/bs";
// import { useRouter } from "next/navigation";
import OverviewCounts from "./OverviewCounts";

const satelliteData = [
  { noradCatId: "49771", intlDes: "2021-115AZ", name: "STARLINK-3201" },
  { noradCatId: "49772", intlDes: "2021-115BA", name: "GLOBAL-12" },
  { noradCatId: "49773", intlDes: "2021-115BB", name: "GLOBAL-13" },
  { noradCatId: "49789", intlDes: "1982-092JF", name: "COSMOS 1408 DEB" },
  { noradCatId: "49809", intlDes: "2021-116A", name: "GALILEO 27 (223)" },
  { noradCatId: "49810", intlDes: "2021-116B", name: "GALILEO 28 (224)" },
  { noradCatId: "49811", intlDes: "2021-116C", name: "FREGAT R/B" },
  { noradCatId: "49812", intlDes: "2021-117A", name: "OBJECT A" },
  { noradCatId: "49817", intlDes: "2021-118A", name: "STPSAT-6" },
  { noradCatId: "49818", intlDes: "2021-118B", name: "LDPE-1" },
  { noradCatId: "49819", intlDes: "2021-118C", name: "ATLAS 5 CENTAUR R/B" },
  { noradCatId: "49840", intlDes: "1982-092KX", name: "COSMOS 1408 DEB" },
  { noradCatId: "49844", intlDes: "1982-092LB", name: "COSMOS 1408 DEB" },
  { noradCatId: "49845", intlDes: "1982-092LC", name: "COSMOS 1408 DEB" },
  { noradCatId: "49846", intlDes: "1982-092LD", name: "COSMOS 1408 DEB" },
  { noradCatId: "49847", intlDes: "1982-092LE", name: "COSMOS 1408 DEB" },
  { noradCatId: "49848", intlDes: "1982-092LF", name: "COSMOS 1408 DEB" },
  { noradCatId: "49849", intlDes: "1982-092LG", name: "COSMOS 1408 DEB" },
];

const SelectedWindow = () => {



  return (
    <div className="">
      {/* Summary Counts */}
      
      <OverviewCounts />
    

     

     
     
    </div>
  );
};

export default SelectedWindow;
