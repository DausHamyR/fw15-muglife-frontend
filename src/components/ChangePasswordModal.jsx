import React from 'react';

const ChangePasswordModal = ({ visibleModal }) => {
    const [closeModal, setCloseModal] = React.useState(visibleModal);
    const close = () => {
        setCloseModal(false);
    };
    return (
        <>
            <div>
                <input type="checkbox" id="loading" className="modal-toggle" checked={closeModal} />
                <div className="modal">
                    <div className="modal-box bg-white">
                        <div className="py-1 text-black text-lg font-semibold">Change Password</div>
                        <div className="text-warning text-sm">*Please change the password periodically</div>
                        <form className="modal-action flex flex-col items-center justify-center gap-7 w-full">
                            <div className="w-full">
                                <div className="text-base text-primary pb-2">Old Password</div>
                                <input type="password" className="input input-primary w-full" />
                            </div>
                            <div className="w-full">
                                <div className="text-base text-primary pb-2">New Password</div>
                                <input type="password" className="input input-primary w-full" />
                            </div>
                            <div className="w-full">
                                <div className="text-base text-primary pb-2">Confirm Password</div>
                                <input type="password" className="input input-primary w-full" />
                            </div>
                            <div className="w-full flex items-center justify-end gap-5">
                                <button
                                    type="button"
                                    className="btn btn-warning w-20 capitalize text-black"
                                    onClick={() => {
                                        close();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button className="btn btn-accent w-40 capitalize text-black ">Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordModal;
