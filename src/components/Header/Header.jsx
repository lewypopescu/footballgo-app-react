import { useNavigate } from "react-router-dom";

import footballgo from "../../images/footballgo.webp";

import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(0);
  };

  return (
    <header className={styles.header}>
      <img
        src={footballgo}
        alt="FootballGO logo"
        className={styles.logo}
        onClick={handleLogoClick}
      />
    </header>
  );
};

export default Header;
