import { FaWindowClose } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  headerText: string;
};

const Modal: React.FC<Props> = ({ children, headerText, onClose }) => {
  return (
    <div className="fixed inset-y-0 w-full overflow-y-auto rounded border border-slate-600 bg-slate-800 p-2">
      <div
        className="absolute right-1 top-0.5 p-1 hover:cursor-pointer"
        onClick={onClose}
      >
        <FaWindowClose className="h-5 w-5" />
      </div>
      <div className="mb-2 border-b-2 border-slate-600 pb-2 pl-1 text-2xl text-pink-400">
        {headerText}
      </div>
      <div className="px-2 pt-1">{children}</div>
    </div>
  );
};

export default Modal;
