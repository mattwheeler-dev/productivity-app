import { Dialog } from "@headlessui/react";

type ConfirmDeleteModalProps = {
	isOpen: boolean;
	onCancel: () => void;
	onConfirm: () => void;
	taskTitle: string;
};

const ConfirmDeleteModal = ({
	isOpen,
	onCancel,
	onConfirm,
	taskTitle,
}: ConfirmDeleteModalProps) => {
	return (
		<Dialog open={isOpen} onClose={onCancel} className="relative z-50">
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center">
				<Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
					<Dialog.Title className="text-lg font-semibold">
						Delete Task
					</Dialog.Title>
					<Dialog.Description className="text-sm text-gray-600">
						Are you sure you want to delete <strong>{taskTitle}</strong>?
					</Dialog.Description>

					<div className="flex justify-end gap-2 pt-4">
						<button
							onClick={onCancel}
							className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
						>
							Cancel
						</button>
						<button
							onClick={onConfirm}
							className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
						>
							Delete
						</button>
					</div>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default ConfirmDeleteModal;
