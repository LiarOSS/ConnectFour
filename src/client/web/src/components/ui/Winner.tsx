import React from "react";

const Winner = ({name, color}: { name: string, color: string }) => (
    <div className="mx-auto rounded-2xl p-8 bg-white mt-6 uppercase max-w-md text-center flex">
        <div>
            <h1 className="text-2xl">The winner is {name}!</h1>
            <span>Congratulations!</span>
        </div>
        <div className="ml-4">
            <div className={`h-[60px] w-[60px] rounded-full ${color}`}></div>
        </div>
    </div>
)

export default Winner;