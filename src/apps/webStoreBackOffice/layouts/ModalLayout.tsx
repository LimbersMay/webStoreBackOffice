import {ReactElement} from "react";

interface ModalProps {
    children?: ReactElement | ReactElement[];
    action: 'Create' | 'Update' | 'Select';
    onClose?: () => void;
}

export const ModalLayout = ({ children, action, onClose }: ModalProps) => {
    return (
        <>
            {
                <>
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
                        {/* Black opacity background */}

                        <div className="flex">
                            <div className="bg-black opacity-50" onClick={onClose}></div>
                            <div className="relative z-50 flex flex-col gap-2 rounded bg-white p-4 shadow-lg">
                                <h2 className="text-2xl font-bold text-green-800">
                                    <span className="mr-2 text-neutral-950">{action}</span>
                                    <span className="text-green-800">Registro</span>
                                </h2>
                                <hr/>
                                {
                                    children
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
};