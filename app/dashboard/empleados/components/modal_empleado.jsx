"use client";

import { useState, useEffect } from "react";
import empleado_service from "../services/empleado.service";
import user_service from "../../users/services/user.service";
import { useRouter } from "next/navigation";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useContext } from "react";
import { getCookie, setCookie } from "cookies-next";
import ModalWrapper from "../../components/modal-wrapper";
import { DisplayNameContext } from "../../components/DisplayNameContext";
import { safeJsonParse } from "@/lib/safe-json";

export default function modal_empleado({
  isVisible,
  onClose,
  data,
  onUpdateSuccess,
  isProfileEdit = false,
}) {
  const router = useRouter();

  const { updateDisplayName } = useContext(DisplayNameContext);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    telefono: "",
    id_rol: "",
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState({ status: undefined, message: "" });
  const [button, setButtonStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    // Campos obligatorios
    const requiredFields = ["nombre", "apellido", "email", "dni", "telefono"];

    // El rol es obligatorio cuando no se está editando el perfil
    if (!isProfileEdit) {
      requiredFields.push("id_rol");
    }

    // Validación de campos obligatorios
    if (requiredFields.includes(name) && !String(value).trim()) {
      return "El campo es obligatorio";
    }

    // Nombre
    if (name === "nombre" && value) {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(value)) {
        return "El nombre solo puede contener letras y espacios";
      }

      if (value.trim().length < 2) {
        return "El nombre debe tener al menos 2 caracteres";
      }
    }

    // Apellido
    if (name === "apellido" && value) {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(value)) {
        return "El apellido solo puede contener letras y espacios";
      }

      if (value.trim().length < 2) {
        return "El apellido debe tener al menos 2 caracteres";
      }
    }

    // Correo
    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        return "Ingrese un correo electrónico válido";
      }
    }

    // DNI
    if (name === "dni" && value) {
      if (!/^\d+$/.test(value)) {
        return "El DNI solo puede contener números";
      }

      if (value.length !== 8) {
        return "El DNI debe tener exactamente 8 dígitos";
      }
    }

    // Teléfono
    if (name === "telefono" && value) {
      if (!/^\d+$/.test(value)) {
        return "El teléfono solo puede contener números";
      }

      if (!/^9\d{8}$/.test(value)) {
        return "El teléfono debe tener 9 dígitos y empezar con 9";
      }
    }

    // Rol
    if (name === "id_rol" && !isProfileEdit && value) {
      const roleExists = roles.some(
        (rol) => String(rol.id_rol) === String(value),
      );

      if (!roleExists) {
        return "Seleccione un rol válido";
      }
    }

    return error;
  };

  const isFormValid = () => {
    const fields = ["nombre", "apellido", "email", "dni", "telefono"];

    if (!isProfileEdit) {
      fields.push("id_rol");
    }

    return fields.every(
      (field) => validateField(field, formData[field], formData) === "",
    );
  };

  useEffect(() => {
    //console.log("updateDisplayName en ModalEmpleado:", typeof updateDisplayName);
  }, [updateDisplayName]);

  // Resetear estados cuando el modal se cierra
  useEffect(() => {
    if (!isVisible) {
      setError({
        status: undefined,
        message: "",
      });

      setButtonStatus(true);
      setIsLoading(false);
      setTouched({});
      setErrors({});
    }
  }, [isVisible]);

  // carga de roles al montar el componente
  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await empleado_service.getRoles();
        if (response.status === 200) {
          setRoles(response.data);
        }
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    }

    if (isVisible && !isProfileEdit) {
      fetchRoles();
    }
  }, [isVisible, isProfileEdit]);

  // actualiza formData cuando cambian data o roles
  useEffect(() => {
    if (data && (roles.length > 0 || isProfileEdit)) {
      // logica para determinar el id_rol
      let rolId = "";

      // caso: ya hay un rol directo
      if (data.id_rol) {
        rolId = data.id_rol;
      }
      // caso: el rol es un objeto y tiene id_rol
      else if (data.rol && typeof data.rol === "object" && data.rol.id_rol) {
        rolId = data.rol.id_rol;
      }
      // caso: el rol es un string y se busca su id_rol
      else if (data.rol && typeof data.rol === "string" && roles.length > 0) {
        const matchingRole = roles.find(
          (r) => r.nombre.toLowerCase() === data.rol.toLowerCase(),
        );
        rolId = matchingRole ? matchingRole.id_rol : "";
      }

      setFormData({
        nombre: data.nombre || "",
        apellido: data.apellido || "",
        email: data.email || "",
        dni: data.dni || "",
        telefono: data.telefono || "",
        id_rol: rolId,
      });
    } else if (isVisible && !data) {
      // limpiar formulario si no hay data
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        telefono: "",
        id_rol: "",
      });
    }
  }, [data, roles, isVisible]);

  // si el modal no es visible, no renderiza nada
  if (!isVisible) return null;

  const handleBlur = (e) => {
    const { id, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    const error = validateField(id, value);

    setErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    let newValue = value;

    // Nombre y apellido: solo letras, espacios y caracteres españoles
    if (id === "nombre" || id === "apellido") {
      newValue = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g, "");
    }

    // DNI: solo números y máximo 8 caracteres
    if (id === "dni") {
      newValue = value.replace(/\D/g, "").slice(0, 8);
    }

    // Teléfono: solo números y máximo 9 caracteres
    if (id === "telefono") {
      newValue = value.replace(/\D/g, "").slice(0, 9);
    }

    setFormData((prev) => ({
      ...prev,
      [id]: newValue,
    }));

    // Validar automáticamente si el usuario ya visitó el campo
    if (touched[id]) {
      const error = validateField(id, newValue);

      setErrors((prev) => ({
        ...prev,
        [id]: error,
      }));
    }
  };

  // Función para resetear el estado y cerrar el modal
  function handleClose() {
    setError({
      status: undefined,
      message: "",
    });

    setButtonStatus(true);
    setIsLoading(false);
    setTouched({});
    setErrors({});

    if (typeof onClose === "function") {
      onClose();
    }
  }

  function validateFormBeforeSubmit() {
    const fields = ["nombre", "apellido", "email", "dni", "telefono"];

    if (!isProfileEdit) {
      fields.push("id_rol");
    }

    const newTouched = {};
    const newErrors = {};

    fields.forEach((field) => {
      newTouched[field] = true;

      const error = validateField(field, formData[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function createEmpleado() {
    if (formData.nombre.length <= 2)
      return setError({
        status: true,
        message: "Ingresar correctamente el nombre",
      });
    if (formData.apellido.length <= 2)
      return setError({
        status: true,
        message: "Ingresar correctamente el apellido",
      });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(formData.email))
      return setError({
        status: true,
        message: "Ingresar correctamente el email",
      });
    if (formData.dni.length < 8)
      return setError({ status: true, message: "DNI inválido" });

    const form = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      dni: formData.dni,
      telefono: formData.telefono,
      id_rol: formData.id_rol,
    };

    setButtonStatus(false);
    setIsLoading(true);

    empleado_service
      .create(form)
      .then((response) => {
        if (response.error) {
          const backendMessage = response.message || "";
          const isDuplicateEmail =
            response.status === 409 ||
            (/email|correo/i.test(backendMessage) &&
              /taken|registrad|existe|use/i.test(backendMessage));
          setError({
            status: true,
            message: isDuplicateEmail
              ? "Ya existe un empleado registrado con ese correo"
              : backendMessage || "Hubo un error al crear el empleado",
          });
          setButtonStatus(true);
        } else {
          if (response.status === 200) {
            setError({
              status: false,
              message: "Empleado creado correctamente",
            });
            setTimeout(() => {
              handleClose();
            }, 1000);
          } else {
            setError({
              status: true,
              message: "Hubo un error al crear el empleado",
            });
            setButtonStatus(true);
          }
        }
      })
      .catch((error) => {
        console.error("Error al crear empleado:", error);
        setError({
          status: true,
          message: "Hubo un error al crear el empleado",
        });
        setButtonStatus(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function updateEmpleado() {
    const form = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      dni: formData.dni,
      telefono: formData.telefono,
    };

    if (!isProfileEdit) {
      form.id_rol = formData.id_rol;
    }

    setButtonStatus(false);
    setIsLoading(true);

    empleado_service
      .update(form, data.id_empleado)
      .then((response) => {
        if (response.status == 500) {
          user_service.logoutClient(router);
        } else {
          if (Number.parseInt(response.status) == 200) {
            setError({
              status: false,
              message: "Información actualizada correctamente",
            });

            if (isProfileEdit) {
              const currentEmpleadoData = safeJsonParse(
                getCookie("empleado"),
                null,
              );

              if (currentEmpleadoData) {
                const updatedEmpleadoData = {
                  ...currentEmpleadoData,
                  ...form,
                };
                setCookie("empleado", JSON.stringify(updatedEmpleadoData));

                // Actualizamos el displayName mediante el contexto
                if (isProfileEdit && typeof updateDisplayName === "function") {
                  //console.log("Llamando a updateDisplayName con:", `${formData.nombre} ${formData.apellido}`);
                  updateDisplayName(`${formData.nombre}`);
                }
              }
            }

            if (typeof onUpdateSuccess === "function") {
              onUpdateSuccess({ ...data, ...form });
            }

            setTimeout(() => {
              handleClose();
            }, 1000);

            console.log("Datos actualizados:", data);
          } else {
            setError({
              status: true,
              message: "Hubo un error al actualizar la información",
            });
            setButtonStatus(true);
          }
        }
      })
      .catch((error) => {
        console.error("Error al actualizar información:", error);
        setError({
          status: true,
          message: "Hubo un error al actualizar la información",
        });
        setButtonStatus(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function guardarEmpleado() {
    const isValid = validateFormBeforeSubmit();

    if (!isValid) {
      return;
    }

    if (!data) {
      createEmpleado();
    } else {
      updateEmpleado();
    }
  }

  return (
    <ModalWrapper>
      <section className="fixed inset-0 bg-black bg-opacity-45 backdrop-blur-md flex justify-center items-center px-4 dark:text-white  ">
        <div
          className={`w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 dark:bg-gray-900 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">
              {isProfileEdit ? "Editar Perfil" : "Empleados"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {error.status !== undefined && (
            <div
              className={`border-l-4 p-4 mb-4 rounded-r flex items-center ${
                error.status === false
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
              }`}
            >
              {error.status === false ? (
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
              )}
              <p
                className={`text-sm ${error.status === false ? "text-green-700" : "text-red-700"}`}
              >
                {error.message}
              </p>
            </div>
          )}

          <form className="dark:text-white ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <fieldset className="flex flex-col gap-2">
                <label className="font-semibold text-sm" htmlFor="nombre">
                  Nombre
                </label>

                <input
                  id="nombre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.nombre}
                  className={`dark:text-black w-full border py-3 px-4 outline-none rounded-md ${
                    touched.nombre && errors.nombre
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="Ingrese el nombre"
                />

                {touched.nombre && errors.nombre && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.nombre}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label className="font-semibold text-sm" htmlFor="apellido">
                  Apellido
                </label>

                <input
                  id="apellido"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.apellido}
                  className={`dark:text-black w-full border py-3 px-4 outline-none rounded-md ${
                    touched.apellido && errors.apellido
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  type="text"
                  placeholder="Ingrese el apellido"
                />

                {touched.apellido && errors.apellido && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.apellido}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label className="font-semibold text-sm" htmlFor="email">
                  Correo
                </label>

                <input
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.email}
                  className={`dark:text-black w-full border py-3 px-4 outline-none rounded-md ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  type="email"
                  placeholder="Ingrese el correo"
                />

                {touched.email && errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label className="font-semibold text-sm" htmlFor="dni">
                  DNI
                </label>

                <input
                  id="dni"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.dni}
                  className={`dark:text-black w-full border py-3 px-4 outline-none rounded-md ${
                    touched.dni && errors.dni
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  placeholder="Ingrese el DNI"
                />

                {touched.dni && errors.dni && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.dni}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label className="font-semibold text-sm" htmlFor="telefono">
                  Teléfono
                </label>

                <input
                  id="telefono"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.telefono}
                  className={`dark:text-black w-full border py-3 px-4 outline-none rounded-md ${
                    touched.telefono && errors.telefono
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  type="text"
                  inputMode="numeric"
                  maxLength={9}
                  placeholder="Ingrese el teléfono"
                />

                {touched.telefono && errors.telefono && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.telefono}
                  </p>
                )}
              </fieldset>

              {/* Solo mostramos el selector de rol cuando NO es edición de perfil */}
              {!isProfileEdit && (
                <fieldset className="flex flex-col gap-2">
                  <label className="font-semibold text-sm" htmlFor="id_rol">
                    Rol
                  </label>
                  <select
                    id="id_rol"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.id_rol}
                    className={`dark:text-black w-full border py-3 px-4 outline-none rounded-md ${
                      touched.id_rol && errors.id_rol
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Seleccione un rol</option>
                    {roles.map((rol) => (
                      <option key={rol.id_rol} value={rol.id_rol}>
                        {rol.nombre
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase(),
                          )
                          .join(" ")}
                      </option>
                    ))}
                  </select>

                  {touched.id_rol && errors.id_rol && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.id_rol}
                    </p>
                  )}
                </fieldset>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                className={`bg-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-600 transition-colors ${
                  isLoading || !isFormValid()
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                type="button"
                onClick={guardarEmpleado}
                disabled={!button || isLoading || !isFormValid()}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Guardando...
                  </span>
                ) : (
                  "Aceptar"
                )}
              </button>
              <button
                className="bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition-colors"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>
    </ModalWrapper>
  );
}
