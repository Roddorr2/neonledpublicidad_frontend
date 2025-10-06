import { useState } from "react";
import { Link, XIcon } from "lucide-react";

// export default function AddLinkButton({
//   servicios,
//   item,
//   index,
//   handleChange,
// }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {open ? (
//         <div className="w-full text-xs items-center flex gap-4 h-6 justify-between my-2">
//           <div className="flex flex-col">
//             <label className="text-purple-400">Palabra</label>
//             <select
//               className="w-full max-w-24 h-6 focus:bg-white-black break-all bg-white"
//               value={item.keyword ? item.keyword : ""}
//               onChange={(e) => handleChange(e, index, "keyword")}
//             >
//               <option value=""></option>
//               {item.descripcion
//                 .split(/\s+/)
//                 .map((p) => p.replace(/[.,]/g, ""))
//                 .filter((p) => p.length > 0)
//                 .map((keyword, i) => (
//                   <option className="hover:bg-red-500" key={i} value={keyword}>
//                     {keyword}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="flex flex-col">
//             <label className="text-purple-400" htmlFor="">
//               Enlace
//             </label>
//             <select
//               className="w-fulltext-black max-w-24 h-6 break-all "
//               value={item.link || ""}
//               onChange={(e) => handleChange(e, index, "link")}
//             >
//               <option value=""></option>
//               {servicios.map((e, i) => (
//                 <option key={i} value={e.url}>
//                   {e.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             className="text-red-600 items-center"
//             onClick={() => {
//               handleChange({ target: { value: "" } }, index, "keyword");
//               handleChange({ target: { value: "" } }, index, "link");
//               setOpen(false);
//             }}
//           >
//             <XIcon />
//           </button>
//         </div>
//       ) : (
//         <div className="flex items-center w-full justify-end text-white text-xs relative z-10">
//           <div className="text-white">Añadir enlace</div>
//           <button
//             onClick={() => setOpen(true)}
//             type="button"
//             className="p-1 text-slate-400 hover:bg-slate-100 rounded-xl m-1"
//           >
//             <Link />
//           </button>
//         </div>
//       )}
//     </>
//   );
// }
export default function AddLinkButton({ servicios, item, index, handleChange }) {
  const [open, setOpen] = useState(false);

  function handleSelectText() {
    const selection = window.getSelection().toString().trim();
    if (selection) {
      handleChange({ target: { value: selection } }, index, "keyword");
    } else {
      alert("Selecciona un texto dentro de la descripción primero");
    }
  }

  return (
    <>
      {open ? (
        <div className="w-full text-xs items-center flex gap-4 h-6 justify-between my-2">
          <div className="flex flex-col">
            <label className="text-purple-400">Frase seleccionada</label>
            <input
              type="text"
              value={item.keyword || ""}
              readOnly
              className="w-full max-w-40 h-6 bg-gray-200 text-black px-1 rounded"
            />
            <button
              type="button"
              onClick={handleSelectText}
              className="mt-1 text-blue-400 underline"
            >
              Usar selección
            </button>
          </div>

          <div className="flex flex-col">
            <label className="text-purple-400">Enlace</label>
            <select
              className="w-full text-black max-w-32 h-6"
              value={item.link || ""}
              onChange={(e) => handleChange(e, index, "link")}
            >
              <option value=""></option>
              {servicios.map((e, i) => (
                <option key={i} value={e.url}>
                  {e.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="text-red-600 items-center"
            onClick={() => {
              handleChange({ target: { value: "" } }, index, "keyword");
              handleChange({ target: { value: "" } }, index, "link");
              setOpen(false);
            }}
          >
            <XIcon />
          </button>
        </div>
      ) : (
        <div className="flex items-center w-full justify-end text-white text-xs relative z-10">
          <div className="text-white">Añadir enlace</div>
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="p-1 text-slate-400 hover:bg-slate-100 rounded-xl m-1"
          >
            <Link />
          </button>
        </div>
      )}
    </>
  );
}