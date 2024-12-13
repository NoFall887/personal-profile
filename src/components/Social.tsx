import { socials } from "@/lib/const";
import SocialItem from "./SocialItem";
import SocialItemEmail from "./SocialItemEmail";

const Social = () => {
    return (
        <>
            <div className=" absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="blur-2xl opacity-70 bg-cyan-500 absolute w-full h-1/2 social-glob-1 rounded-full z-0"></div>
                <div className="blur-2xl opacity-70 bg-sky-500 absolute w-full h-1/2 social-glob-2 rounded-full z-0"></div>
                <div className="blur-2xl opacity-50 bg-teal-500 absolute w-full h-1/2 social-glob-3 rounded-full z-0"></div>
                <div className="blur-2xl opacity-50 bg-indigo-500 absolute w-full h-1/2 social-glob-1 rounded-full z-0"></div>
            </div>
            <div className="relative z-10 text-slate-950 px-2 py-4 ">
                <h2 className="text-center font-semibold text-xl mb-4">
                    Let&apos;s Connect!
                </h2>
                <div className="relative">
                    <div className=" flex relative justify-center mb-8 h-full z-10 gap-12 ">
                        {socials.slice(0, 2).map((social, idx) => {
                            const { icon, ...props } = social;
                            return (
                                <SocialItem key={idx} {...props}>
                                    {icon}
                                </SocialItem>
                            );
                        })}
                    </div>
                    <div className="flex relative justify-center z-10">
                        <SocialItemEmail {...socials[2]}>
                            {socials[2].icon}
                        </SocialItemEmail>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Social;
