"use client"

export default function Modal({ isActive, closeFunction, imgSrc }) {
    if(!isActive) return null

    return(
        <div 
            className={`fixed top-0 left-0 w-screen h-screen z-50 backdrop-blur-sm hover:cursor-move`}
            onClick={closeFunction}
        >
            <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <img className="mx-auto h-1/2" src={imgSrc} alt="" />
            </div>
        </div>
    )
}