import ContactForm from "@/components/ContactForm";
import GlowBox from "@/components/GlowBox";
import React from "react";

const page = () => {
    return (
        <GlowBox
            as="div"
            className="max-w-2xl mt-12 mx-auto pt-4 pb-6 px-5 text-white"
            tilt={false}
        >
            <ContactForm />
        </GlowBox>
    );
};

export default page;
