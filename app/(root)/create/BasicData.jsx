import React from "react";

const BasicData = () => {
  return (
    <div className="w-full flex flex-col gap-8 basic-input-field">
      <h3 className="text-3xl text-sky-950 text-center">Game Details</h3>
      <input type="text" placeholder="Game Title" className="" />
      <input type="text" placeholder="Venue" className="" />
      <input type="text" placeholder="No: of levels" className="" />
    </div>
  );
};

export default BasicData;
