import { contactSchema } from "@/lib/schema";
import z from "zod";

const EmailTemplate: React.FC<Readonly<z.infer<typeof contactSchema>>> = ({
    content,
    email,
    fullname,
}) => {
    return (
        <div>
            <h1>Email from {fullname}</h1>
            <h3>({email})</h3>
            <p>{content}</p>
        </div>
    );
};

export default EmailTemplate;
