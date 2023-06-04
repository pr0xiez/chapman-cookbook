import cx from "classnames";
import type { ButtonHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({ fullWidth, children, ...props }) => {
  return (
    <button
      {...props}
      className={cx(
        "rounded border-2 border-pink-400 px-4 py-2 hover:border-pink-300 hover:bg-slate-800",
        {
          "w-full": fullWidth,
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
