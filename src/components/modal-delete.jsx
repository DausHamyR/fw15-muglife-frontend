const ModalDelete = () => {
  return (
    <div>
      <div className="modal" id="my-modal-2">
        <div className="modal-box bg-[#3C2A21]">
          <div className="flex justify-center">
            <h3 className="font-bold text-lg">
                            Are you sure want to delete the selected items ?
            </h3>
          </div>
          <div className="modal-action flex justify-between gap-[280px] items-center w-[100px]">
            <a href="#" className="btn bg-white hover:bg-[#D5CEA3] text-black hover:text-[#3C2A21]">Cancel</a>
            <a href="#" className="btn bg-[#7e4326] hover:bg-[#8a563d] text-[#D5CEA3]">Delete</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;