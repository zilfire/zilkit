'use client';
import clsx from 'clsx';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { useRef } from 'react';

const SidePanel: React.FC<{
  children: React.ReactNode;
  sidePanelOpen: boolean;
  setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ children, sidePanelOpen, setSidePanelOpen }) => {
  const sidePanelOverlay = useRef<HTMLDivElement>(null);

  return (
    <div
      id="side-panel-overlay"
      ref={sidePanelOverlay}
      onClick={(e) => {
        if (e.target === sidePanelOverlay.current) {
          setSidePanelOpen(false);
        }
      }}
      className={clsx(
        'fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30 transition-opacity duration-300',
        sidePanelOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <div
        id="side-panel"
        className={clsx(
          'fixed inset-y-0 right-0 w-72 max-w-full overflow-y-auto bg-white shadow-xl',
          'transform transition-transform duration-300',
          sidePanelOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <button
          id="close-side-panel"
          className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full text-black focus:outline-none focus:ring-2 focus:ring-gray-600"
          onClick={() => {
            setSidePanelOpen(false);
          }}
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        <div className="mt-10 h-full p-4">{children}</div>
      </div>
    </div>
  );
};

export default SidePanel;
