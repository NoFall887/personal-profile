import ExperienceItem from "@/components/ExperienceItem";
import GlowBox from "@/components/GlowBox";
import IdFlag from "@/components/IdFlag";
import LocationGreenDots from "@/components/LocationGreenDots";
import LocationPin from "@/components/LocationPin";
import Name from "@/components/Name";
import Resume from "@/components/Resume";
import Social from "@/components/Social";
import Sprite from "@/components/Sprite";
import Tool from "@/components/Tool";
import { experiences, tools } from "@/lib/const";

export default function Home() {
    return (
        <main
            className="max-w-screen-lg bento-grid mx-auto mt-12 text-white"
            style={{ perspective: "2000px" }}
        >
            <GlowBox
                as={"div"}
                className="item rounded-xl flex items-center justify-center py-4 px-3"
            >
                <Name />
            </GlowBox>
            <GlowBox as={"div"} className="item rounded-xl">
                <p className=" leading-tight text-white/70 justify px-4 py-4">
                    I&apos;m a CS freshgraduate with a strong interest in web development
                    and hands-on experience in both front-end and back-end technologies.
                </p>
            </GlowBox>
            <GlowBox as={"div"} className="item rounded-xl flex flex-col justify-center">
                <h2 className="text-center font-semibold text-2xl pt-2 mb-3 relative z-20">
                    Based in
                </h2>
                <LocationPin />
                <div className="flex gap-2 items-center justify-center pb-3 mt-2">
                    <LocationGreenDots />
                    <p className="font-semibold text-xl">Indonesia</p>
                    <IdFlag />
                </div>
            </GlowBox>
            <GlowBox as={"div"} className="item rounded-xl px-0 py-3">
                <h2 className="text-xl font-medium text-center px-4 mb-3">Experiences</h2>
                {experiences.map((experience, idx) => {
                    return <ExperienceItem key={idx} {...experience} />;
                })}
            </GlowBox>
            <GlowBox as={"div"} className="item rounded-xl p-0  bg-blue-100 relative">
                <Social />
            </GlowBox>
            <GlowBox as={"div"} className="item rounded-xl px-4 pt-3 pb-5 relative">
                <Resume />
            </GlowBox>
            <GlowBox as={"div"} className="item rounded-xl py-3 pb-5 px-4">
                <h2 className="text-white text-xl font-medium inline-block mb-3 coin">
                    Tools I&apos;ve worked with
                </h2>
                <div className="gap-4 flex flex-wrap">
                    {tools.map((tool, idx) => {
                        return <Tool {...tool} key={idx} />;
                    })}
                </div>
            </GlowBox>

            <Sprite />
        </main>
    );
}
