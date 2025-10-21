import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DropdownLink({ text, link, isInicio, closeMenu, onClick, final }) {
    const pathname = usePathname();
    const mainCategory = "/" + pathname.split("/")[1]; 
    const isActive = pathname === link || (mainCategory === link);

    return (
        <Link
            href={link}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault(); 
                    onClick(); 
                }
                if (closeMenu) closeMenu(); 
            }}
            className={`flex items-center justify-between gap-2 py-6 px-6 text-white font-bold text-lg
                ${isActive ? "bg-[#48A8FF]" : "bg-[--azul_oscuro]"} 
                ${final ? "border-b-2 border-b-[--azul_brillante]" : ""} 
                border-t-2 border-t-[--celeste] hover:bg-[--azul_intenso] transition-colors duration-200`}
        >
            <span>{text}</span>
            {!isInicio && (
                <span className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[12px] border-l-transparent border-r-transparent border-t-white -rotate-90"></span>
            )}
        </Link>
    );
}