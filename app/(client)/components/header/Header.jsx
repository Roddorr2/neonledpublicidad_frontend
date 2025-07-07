"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DropdownLink from "./components/DropdownLink";
import LinkNav from "./components/LinkNav";
import "./header.css";

export default function Header() {
    const [menuActive, setMenuActive] = useState(false);
    const [containerFullHeight, setContainerFullHeight] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [menuInitialized, setMenuInitialized] = useState(false);
    const [currentMenu, setCurrentMenu] = useState("main");

    useEffect(() => {
        const savedMenuState = localStorage.getItem("menuActive");
        if (savedMenuState !== null) {
            setMenuActive(JSON.parse(savedMenuState));
        }

        const handleResize = () => {
            if (window.innerWidth <= 850) {
                setIsSmallScreen(true);
                if (!menuInitialized) {
                    setMenuInitialized(true);
                    if (!savedMenuState) {
                        setMenuActive(true);
                    }
                    setContainerFullHeight(true);
                }
            } else {
                setCurrentMenu("main");
                setIsSmallScreen(false);
                setMenuActive(false);
                setContainerFullHeight(false);
                setMenuInitialized(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [menuInitialized]);

    useEffect(() => {
        localStorage.setItem("menuActive", JSON.stringify(menuActive));
        if (menuActive) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [menuActive]);

    const toggleMenu = () => {
        if (menuActive) {
            setCurrentMenu("main");
            setContainerFullHeight(false);
        } else {
            setContainerFullHeight(true);
        }
        setMenuActive(!menuActive);
    };


    const goToSubMenu = (menu) => {
        setCurrentMenu(menu);
    };

    const goBack = () => {
        setCurrentMenu("main");
    };

    return (
        <>
            <div className={`containerF ${menuActive ? "full-height" : ""}`}>
                <header
                    className={`header-container h-[100px] bg-[--azul_oscuro] flex items-center justify-center gap-6 px-5 ${menuActive ? "menu-active" : ""}`}
                >
                    <LinkNav text={"Inicio"} link={"/"} />
                    <LinkNav text={"Nosotros"} link={"/nosotros"} />
                    <LinkNav text={"Productos"} link={"/productos"} />
                    

                    {currentMenu === "main" ? (
                        <div className=" w-[90px] text-white mx-7 text-center logo">
                            <img src="/header_footer/logo_azul_letraBlanco_ledneonpublicidad.webp" alt="Logotipo de Neon LED Publicidad con letras blancas y fondo negro" />
                        </div>
                    ) : (
                        <div className="h-[50px] w-auto  text-white mx-7 text-center logo flex items-center justify-center">
                            <a
                                href="#"
                                onClick={() => {
                                    goBack();
                                }}
                                className="text-white font-bold cursor-pointer"
                            >
                                &lt; Volver
                            </a></div>
                    )}

                    <LinkNav text={"Contacto"} link={"/contacto"} />
                    <LinkNav text={"Blog"} link={"/blog"} />
                    <LinkNav text={"Login"} link={"/login"} />

                    {isSmallScreen && (
                        <div className="menu-icon" onClick={toggleMenu}>
                            <span className={`menu-icon-text ${menuActive ? "text-small" : "text-large"}`}>
                                {menuActive ? "Cerrar" : "\u2630"}
                            </span>
                            {menuActive && (
                                <div className="icon-box">
                                    <div className="inner-box">
                                        <div className="bar bar1"></div>
                                        <div className="bar bar2"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </header>
                {/* {menuActive && (
                    <div className="dropdown-menu bg-gradient-to-r from-[--azul_brillante] to-[--azul_intenso]"> */}
                <div className={`dropdown-menu bg-gradient-to-r from-[--azul_brillante] to-[--azul_intenso] ${menuActive ? "show" : ""}`}>

                    {currentMenu === "main" && (
                        <>
                            <DropdownLink
                                text={"Inicio"}
                                link={"/"}
                                isInicio={true}
                                final={false}
                                closeMenu={() => {
                                    setMenuActive(false);
                                    setContainerFullHeight(false);
                                }}
                            />
                            <DropdownLink
                                text={"Nosotros"}
                                link={"/nosotros"}
                                isInicio={false}
                                final={false}
                                 closeMenu={() => {
                                    setMenuActive(false);
                                    setContainerFullHeight(false);
                                }}
                            />
                            <DropdownLink
                                text={"Productos"}
                                link={"/productos"}
                                isInicio={false}
                                final={false}
                                onClick={() => goToSubMenu("productos")}

                            />
                            <DropdownLink
                                text={"Contacto"}
                                link={"/contacto"}
                                isInicio={false}
                                final={false}
                                closeMenu={() => {
                                    setMenuActive(false);
                                    setContainerFullHeight(false);
                                }}
                            />
                            <DropdownLink
                                text={"Blog"}
                                link={"/blog"}
                                isInicio={false}
                                final={true}
                                closeMenu={() => {
                                    setMenuActive(false);
                                    setContainerFullHeight(false);
                                }}
                            />
                            <DropdownLink
                                text={"Login"}
                                link={"/login"}
                                isInicio={false}
                                final={false}
                                closeMenu={() => {
                                    setMenuActive(false);
                                    setContainerFullHeight(false);
                                }}
                            />
                        </>

                    )}
                    {currentMenu === "productos" && (
                        <>
                            <DropdownLink text={"Letras de acrílico"} link={"/productos/letras-acrilico"} isInicio={true} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Letras doradas y plateadas"} link={"/productos/letras-doradas"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Letreros limunosos"} link={"/productos/letreros-luminosos"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Letras de Neón"} link={"/productos/letras-neon"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Neón Led"} link={"/productos/neon-led"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Impresión en viniles decorativos"} link={"/productos/impresion-vinilo"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Menú Board"} link={"/productos/menu-board"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Letras pintadas en MDF"} link={"/productos/letras-pintadas"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Displays"} link={"/productos/displays"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Pantallas Led"} link={"/productos/pantalla-led"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Holográfico"} link={"/productos/holografico"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Pixel Led"} link={"/productos/pixel-led"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Sillas Luminosas"} link={"/productos/sillas-luminosas"} isInicio={false} final={false} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                            <DropdownLink text={"Techos Led"} link={"/productos/techos-led"} isInicio={false} final={true} closeMenu={() => {
                                setMenuActive(false);
                                setContainerFullHeight(false);
                                setCurrentMenu("main");
                            }} />
                        </>
                    )}

                    <div className="red-bg">
                        <div className="absolute w-[110px] h-[110px] left-1/2 bottom-0 translate-x-[-50%] translate-y-[40%] z-30 rounded-full bg-white flex items-center justify-center">
                            <img
                                className="w-[75px] h-[75px] object-contain"
                                src="/header_footer/logo_azul_letraNegra_ledneonpublicidad.webp"
                                alt="Logotipo de Neon LED Publicidad con letras negras"
                            />
                        </div>
                    </div>

                </div>
                {/* )} */}
            </div>
        </>
    );
}
