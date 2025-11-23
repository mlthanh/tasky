import { ReactNode } from 'react';
import { Button } from './Button';
import { RoundClose } from './Icon';
import { useDeviceStore } from '@frontend/hooks/stores';

interface ModalProps {
  isOpen: boolean;
  hasButton?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, hasButton, children }: ModalProps) => {
  if (!isOpen) return null;

  const { isMobile } = useDeviceStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className={
          isMobile
            ? 'relative w-11/12 max-w-sm p-4 bg-white rounded-xl'
            : 'relative w-[600px] p-8 bg-white rounded-2xl shadow-xl'
        }
      >
        {hasButton && (
          <Button
            className="absolute text-gray-600 top-2 right-2"
            onClick={onClose}
          >
            <RoundClose />
          </Button>
        )}

        {children}
      </div>
    </div>
  );
};
