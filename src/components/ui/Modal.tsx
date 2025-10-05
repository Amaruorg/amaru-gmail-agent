"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "motion/react";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

/**
 * Modal Component
 * Props:
 * - isOpen: boolean — Controls the visibility of the modal.
 * - onClose: () => void — Function to call when the modal should be closed.
 * - children: React.ReactNode — Content to display inside the modal.
 */
function Modal({ isOpen, onClose, children }: ModalProps) {
	const [mounted, setMounted] = useState(false);

	// Evita errores SSR (solo monta en cliente)
	useEffect(() => {
		setMounted(true);
	}, []);

	// Bloquea scroll cuando el modal está abierto
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	if (!mounted) return null;

	return ReactDOM.createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					key="backdrop"
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
					onClick={onClose}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25 }}
				>
					<motion.div
						key="modal"
						className="bg-modal-background text-foreground relative w-full max-w-1/2 rounded-lg p-2 shadow-lg"
						onClick={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 10 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	);
}

export { Modal, type ModalProps };
