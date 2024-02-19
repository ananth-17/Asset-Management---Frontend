import React from "react";
interface ImageModalProps {
  image: string;
  setShowImageModal(flag: boolean): void;
  downloadAssetQR(image: string): void;
}
const ImageModal = (props: ImageModalProps) => {

  const { setShowImageModal, image, downloadAssetQR } = props;

  return (
    <>
        <div
          className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}>
          <div className={`transition-all delay-500 relative xl:w-auto my-6 mx-auto max-w-3xl w-[70%]
            `}>
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex justify-between p-3 border-b border-gray-300">
                <h3 className="text-xl font-semibold text-black">
                  QR
                </h3>
                <button
                  className="text-black group relative"
                  onClick={() => setShowImageModal(false)}
                >
                  <span className="absolute -left-2 bottom-6 scale-0 transition-all rounded bg-black p-1 text-xs text-white group-hover:scale-100">Close</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <img src={`data:image/png;charset=utf-8;base64,${image}`} alt="QrCode"/>
              </div>
              {/*footer*/}
              <div className="flex justify-end gap-4.5 xl:gap-8 p-4 border-t">
                <button
                  className="flex justify-center rounded bg-primary py-1.5 px-4 font-medium text-gray hover:shadow-md"
                  type="button"
                  onClick={() => downloadAssetQR(image)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ImageModal;