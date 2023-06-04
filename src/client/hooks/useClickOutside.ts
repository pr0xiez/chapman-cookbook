import { MutableRefObject, useEffect, useRef } from "react";

const useClickOutside = (ref: any, callback: () => void) => {
  const ref2 = useRef();
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useClickOutside;
