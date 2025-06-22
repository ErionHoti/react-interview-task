import { IoClose } from "react-icons/io5";
import { RiInformation2Fill } from "react-icons/ri";

const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-[3px] flex justify-center items-center z-50">
    <div className="bg-white w-full max-w-3xl mx-4 md:mx-auto rounded-lg shadow-lg overflow-hidden">
      <div className="bg-grey flex justify-between items-center px-4 py-3">
        <p className="text-lg font-semibold">Title</p>
        <IoClose size={22} className="cursor-pointer" onClick={onClose} />
      </div>

      <div className="flex items-center gap-2 px-4 py-3">
        <RiInformation2Fill className="text-blue-800" size={22} />
        <p className="text-sm">
          Informative piece of text that can be used regarding this modal.
        </p>
      </div>

      <div className="px-4 pb-4">{children}</div>
    </div>
  </div>
);

export default Modal;
