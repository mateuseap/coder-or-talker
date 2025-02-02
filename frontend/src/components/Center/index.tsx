import type { CenterProps } from "../../types";
import { classNames } from "../../utils";

function Center({ children, className }: CenterProps) {
  return (
    <div
      className={classNames(
        className,
        "flex flex-1 self-center items-center justify-center text-center"
      )}
    >
      {children}
    </div>
  );
}

export default Center;
