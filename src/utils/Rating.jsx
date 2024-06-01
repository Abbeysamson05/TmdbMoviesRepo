import React from "react";

const RatingComponent = ({ num }) => {
  let splitNum = num.toString().split(".");
  const rate = [];
  for (let i = 0; i < Number(splitNum[0]); i++) {
    rate.push(<img key={i} src="/fulStar.png" alt="rating star" />);
  }
  return (
    <div className="flex gap-2">
      {rate}
      {splitNum[1] !== null && splitNum[1] !== undefined && (
        <img src={"/halfStar.png"} alt="half" />
      )}
    </div>
  );
};

export default RatingComponent;
