import SidePanel from './SidePannel.js';
import MobileMenu from './MobileMenu.js';
import type { FormattedNavData } from './utils/formatNavData.js';
import type { ThemeContext } from '../../../config/types/config.types.js';

type MobileNavProps = {
  navData?: FormattedNavData;
  sidePanelOpen: boolean;
  setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  context: ThemeContext;
};
const MobileNav: React.FC<MobileNavProps> = ({
  navData,
  sidePanelOpen,
  setSidePanelOpen,
  context,
}) => {
  return (
    <>
      <SidePanel sidePanelOpen={sidePanelOpen} setSidePanelOpen={setSidePanelOpen}>
        <MobileMenu
          navData={navData}
          sidePanelOpen={sidePanelOpen}
          setSidePanelOpen={setSidePanelOpen}
          context={context}
        />
      </SidePanel>
    </>
  );
};

export default MobileNav;
