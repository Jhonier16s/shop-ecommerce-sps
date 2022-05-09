import React from "react";

const NewTittles = (props) => {
  return (
    <div className="h-12 my-2  max-w-[1920px] overflow-hidden bg-gradient-to-r  md:h-20 md:pl-10">
      <p className="text-center font-bold text-heading text-4xl md:text-6xl hover:text-purpleSps">
        {props.name}
      </p>
    </div>
  );
};

export default NewTittles;
