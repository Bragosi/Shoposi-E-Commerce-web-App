
const ConfirmOrderCompletion = ({close}) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Order Completion
            </h2>
            <div>
                <button>
                    No
                </button>
                <button 
                onClick={close}>
                    Yes
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmOrderCompletion