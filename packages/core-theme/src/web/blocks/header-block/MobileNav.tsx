import SidePanel from './SidePannel.js';
import MobileMenu from './MobileMenu.js';
import type { FormattedNavData } from './utils/formatNavData.js';

type MobileNavProps = {
  navData?: FormattedNavData;
  sidePanelOpen: boolean;
  setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const MobileNav: React.FC<MobileNavProps> = ({ navData, sidePanelOpen, setSidePanelOpen }) => {
  return (
    <>
      <SidePanel sidePanelOpen={sidePanelOpen} setSidePanelOpen={setSidePanelOpen}>
        <MobileMenu
          navData={navData}
          sidePanelOpen={sidePanelOpen}
          setSidePanelOpen={setSidePanelOpen}
        />
      </SidePanel>
    </>
  );
};

export default MobileNav;
