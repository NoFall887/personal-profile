import DialogForm from "@/components/manage/DialogForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";

const page = () => {
    return (
        <div className="container max-w-screen-xl mx-auto p-4 flex flex-wrap gap-4 text-white items-center justify-center">
            <Dialog>
                <DialogTrigger className="rounded-xl border-2 hover:bg-white/10 border-white border-dashed flex justify-center items-center p-3 w-full max-w-32 aspect-square">
                    <FaPlus className="w-8 h-8" />
                </DialogTrigger>
                <DialogForm />
            </Dialog>
        </div>
    );
};

export default page;
