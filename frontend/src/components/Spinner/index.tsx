import type { SpinnerProps } from "../../types";
import Center from "../Center";
import { classNames, chooseIconSize } from "../../utils";

function Spinner({
  size = "md",
  color = "text-[#3498DB]",
  centered = true,
  hiddenLabel = "Carregando...",
  containerClassName = "",
}: SpinnerProps) {
  return (
    <div className={containerClassName}>
      {centered ? (
        <Center>
          <div
            className={classNames(
              chooseIconSize(size),
              color,
              "inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            )}
            role="status"
          >
            <span className="sr-only">{hiddenLabel}</span>
          </div>
        </Center>
      ) : (
        <div
          className={classNames(
            chooseIconSize(size),
            color,
            "inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          )}
          role="status"
        >
          <span className="sr-only">{hiddenLabel}</span>
        </div>
      )}
    </div>
  );
}

export default Spinner;
