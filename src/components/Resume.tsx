import styles from "@/css/resume.module.css";
import { resumePath } from "@/lib/const";
import { cn } from "@/lib/utils";

const Resume = () => {
    return (
        <>
            <h2 className="text-center font-semibold text-xl mb-3">Grab my resume!</h2>
            <a href={resumePath} className="pb-3" target="_blank">
                <img
                    src={"/download-icons/download1.svg"}
                    alt=""
                    className={cn(
                        styles.downloadarrow,
                        "mx-auto w-6 h-auto top-2 relative download-arrow"
                    )}
                />
                <img
                    src={"/download-icons/download2.svg"}
                    alt=""
                    className="mx-auto w-12 h-auto"
                />
            </a>
        </>
    );
};

export default Resume;
