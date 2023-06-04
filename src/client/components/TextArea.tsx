import type { TextareaHTMLAttributes } from "react";

type Props = {
  labelText: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<Props> = ({ labelText, ...props }) => {
  return (
    <>
      <label className="-mb-1 block font-medium">{labelText}</label>
      <textarea
        {...props}
        rows={4}
        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-slate-400 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 [&:has(:focus-visible)]:border-blue-500 [&:has(:focus-visible)]:ring-blue-500"
      ></textarea>
    </>
  );
};

export default TextArea;
