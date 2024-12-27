import React from "react";
import Yoga from "../assets/styles/yoga.jpg";

export default function home() {
  return (
    <>
      <div
        className="h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Yoga})`,
        }}
      >
        <h1 className="font-bold text-white">WELCOME TO YOGA</h1>
        <p className="mt-10 text-white font-bold w-2/4">
          This is the website of our yoga centers where you can create a user,
          locate us on the map, check our classes on the calendar and see our
          merchandise statistics.
        </p>
      </div>
    </>
  );
}
