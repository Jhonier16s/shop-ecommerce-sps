import React from "react";


const spsImg = ({src}) => {
  return (
    <>
      <div class="max-w-screen-xl mx-auto mb-8 ">
          <img className="w-1200px" src={src}></img>
      </div>
    </>
  );
};

export default spsImg;