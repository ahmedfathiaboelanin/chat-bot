import { FaFilePdf } from "react-icons/fa6";

export default function FileBadge({file}) {
    return (
        <div className={`badge badge-dash badge-neutral cursor-pointer py-5`}>
            <FaFilePdf className="mr-1 text-lg" /> {file}
        </div>
    )
}
