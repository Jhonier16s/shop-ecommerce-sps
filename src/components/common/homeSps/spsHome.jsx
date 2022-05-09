import React from "react";
import Link from "next/dist/client/link";

const SpsHome = ({src, className}) => {
  return (
    <>
      <div className={className}>
          <img className="w-1500px" src={src}></img>
      </div>
    </>
  );
};

export default SpsHome;
