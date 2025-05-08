import { ReactNode } from 'react';
import { Button } from './Button';
import { RoundClose } from './Icon';

interface ModalProps {
  isOpen: boolean;
  hasButton?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, hasButton, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-11/12 max-w-sm p-4 bg-white rounded-xl">
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
