import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import "./Modal.style.css";

interface ModalProps {
  children: JSX.Element;
  show: boolean;
  onClose: () => void;
  width?: string;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  show,
  onClose,
  width,
  showCloseButton = true,
}) => {
  if (!show) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="modal">
        <motion.button
          aria-label="Close modal"
          className="modal-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: 0.15 }}
        />
        <motion.div
          initial={{ opacity: 0, y: "50px" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: 0.2, y: 0.3 }}
          className={`modal-content ${width} dark:bg-secondary-dark-bg`}
          //   onClick={(e) => e.stopPropagation()}
        >
          {/* <div className="modal-header">Modal title</div> */}
          {children}
          {showCloseButton ? (
            <div>
              <button onClick={onClose}>Close</button>
            </div>
          ) : null}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
