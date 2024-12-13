import React from "react";

const Name = () => {
    return (
        <h1 className="text-start font-semibold text-2xl">
            <div className="text-3xl">
                Hi I&apos;m{" "}
                <span
                    className=" bg-gradient-to-br from-blue-500  to-white bg-center bg-clip-text text-transparent animate-[bgmove_3s_linear_infinite_alternate]"
                    style={{ backgroundSize: "300%" }}
                >
                    Naufal
                </span>
            </div>
            <div>A fullstack developer</div>
        </h1>
    );
};

export default Name;
