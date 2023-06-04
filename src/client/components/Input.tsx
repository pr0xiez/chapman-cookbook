import type { InputHTMLAttributes } from "react";

type Props = {
  labelText: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ labelText, ...props }) => {
  return (
    <div className="relative h-10 w-full min-w-[200px]">
      <input
        {...props}
        className="peer h-full w-full rounded-[7px] border border-slate-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-slate-400 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-slate-200 placeholder-shown:border-t-slate-200 focus:border-2 focus:border-pink-400 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-slate-50"
        placeholder=" "
      />
      <label className="before:content[' '] after:content[' '] pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[11px] font-normal leading-tight text-slate-400 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:border-slate-200 before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:border-slate-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-slate-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-400 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:border-pink-400 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:border-pink-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-slate-500">
        {labelText}
      </label>
    </div>
  );
};

export default Input;
