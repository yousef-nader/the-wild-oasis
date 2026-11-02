import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../contexts/DarkModeContext";

export default function DarkModeToggle() {
  const { isDarkMode, ToggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={ToggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
