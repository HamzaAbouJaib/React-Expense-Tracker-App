import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { FiSun } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";


const DarkLightThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <FiSun size={18} /> : <BsMoonStars size={18} />}
    </ActionIcon>
  );
};

export default DarkLightThemeButton;
