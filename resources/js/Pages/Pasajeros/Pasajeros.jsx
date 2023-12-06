import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import WarningButton from "@/Components/WarningButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import InputLabel from "@/Components/InputLabel";

export default function Pasajeros({ auth, passengers, companies }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const client_typeInput = useRef();
    const companyInput = useRef();
    const nameInput = useRef();
    const surnameInput = useRef();
    const phoneInput = useRef();
    const emailInput = useRef();
    const addressInput = useRef();
    const address2Input = useRef();
    const address3Input = useRef();

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        client_type: "",
        company: "",
        name: "",
        surname: "",
        phone: "",
        email: "",
        address: "",
        address2: "",
        address3: "",
    });

    const openModal = (
        op,
        id,
        client_type,
        company,
        name,
        surname,
        phone,
        email,
        address,
        address2,
        address3
    ) => {
        setModal(true);
        setOperation(op);
        setData({
            client_type: "",
            company: "",
            name: "",
            surname: "",
            phone: "",
            email: "",
            address: "",
            address2: "",
            address3: "",
        });
        if (op === 1) {
            setTitle("Crear Pasajero");
        } else {
            setTitle("Modificar Pasajero");
            setData({
                id: id,
                client_type: client_type,
                company: company,
                name: name,
                surname: surname,
                phone: phone,
                email: email,
                address: address,
                address2: address2,
                address3: address3,
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("passengers.store"), {
                onSuccess: () => {
                    ok("Pasajero creado !!");
                },
                onError: () => {
                    if (errors.client_type) {
                        reset(client_type);
                        client_typeInput.current.focus();
                    }
                    if (errors.company) {
                        reset(company);
                        companyInput.current.focus();
                    }

                    if (errors.surname) {
                        reset(surname);
                        surnameInput.current.focus();
                    }
                    if (errors.phone) {
                        reset(phone);
                        phoneInput.current.focus();
                    }
                    if (errors.email) {
                        reset(email);
                        emailInput.current.focus();
                    }
                    if (errors.address) {
                        reset(address);
                        addressInput.current.focus();
                    }
                    if (errors.address2) {
                        reset(address2);
                        address2Input.current.focus();
                    }
                    if (errors.address3) {
                        reset(address3);
                        address3Input.current.focus();
                    }
                },
            });
        } else {
            put(route("passengers.update", data.id), {
                onSuccess: () => {
                    ok("Pasajero actualizado !!");
                },
                onError: () => {
                    if (errors.client_type) {
                        reset(client_type);
                        client_typeInput.current.focus();
                    }
                    if (errors.passenger) {
                        reset(passenger);
                        passengerInput.current.focus();
                    }
                    if (errors.name) {
                        reset(name);
                        nameInput.current.focus();
                    }
                    if (errors.surname) {
                        reset(surname);
                        surnameInput.current.focus();
                    }
                    if (errors.phone) {
                        reset(phone);
                        phoneInput.current.focus();
                    }
                    if (errors.email) {
                        reset(email);
                        emailInput.current.focus();
                    }
                    if (errors.address) {
                        reset(address);
                        addressInput.current.focus();
                    }
                    if (errors.address2) {
                        reset(address2);
                        address2Input.current.focus();
                    }
                    if (errors.address3) {
                        reset(address3);
                        address3Input.current.focus();
                    }
                },
            });
        }
    };
    const ok = (mensaje) => {
        reset();
        closeModal();
        Swal.fire({ title: mensaje, icon: "success" });
    };

    const eliminar = (id, name) => {
        const alerta = Swal.mixin({ buttonsStyling: true });
        alerta
            .fire({
                title: "Estás seguro de eliminar el pasajero " + name,
                text: "Se perderá la información",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: '<i class="fa-solid fa-check"></i>Sí',
                cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route("passengers.destroy", id), {
                        onSuccess: () => {
                            ok("Pasajero eliminado");
                        },
                    });
                }
            });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <>
                <Head title="Pasajeros" />

                <div className="container flex">
                    <Sidebar />
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full mt-2">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-2 text-gray-900">
                                <div className="container bg-white mt-2">
                                    <h1 className="ml-4 ">Pasajeros</h1>
                                    <div className="bg-white grid v-screen place-items-end pr-10">
                                        <div className="mt-1 flex justify-end">
                                            <PrimaryButton
                                                onClick={() => openModal(1)}
                                                className="block h-9 w-auto fill-current text-gray-800"
                                                disabled=""
                                            >
                                                <i className="fa solid fa-plus-circle mr-2"></i>
                                                Crear
                                            </PrimaryButton>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 m-5 pl-2 pr-2">
                                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                            <div className="overflow-hidden rounded-lg">
                                                <table className="min-w-full text-center text-sm font-light">
                                                    <thead className="border-b bg-neutral-800 font-medium text-white">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Empresa
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Nombre
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Apellido
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Teléfono
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Dirección
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Editar
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Eliminar
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {passengers.map(
                                                            (passenger, i) => (
                                                                <tr
                                                                    key={
                                                                        passenger.id
                                                                    }
                                                                    className="border-b"
                                                                >
                                                                  
                                                                    <td  className="whitespace-nowrap  px-6 py-4 font-medium">
                                                                        {
                                                                           auth.user.company
                                                                        }
                                                                    </td>
                                                                   
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            passenger.name
                                                                        }
                                                                    </td>

                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            passenger.surname
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            passenger.phone
                                                                        }
                                                                    </td>

                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            passenger.address
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        <WarningButton
                                                                            onClick={() =>
                                                                                openModal(
                                                                                    2,
                                                                                    passenger.id,
                                                                                    passenger.client_type,
                                                                                    passenger.company,
                                                                                    passenger.name,
                                                                                    passenger.surname,
                                                                                    passenger.phone,
                                                                                    passenger.email,
                                                                                    passenger.address,
                                                                                    passenger.address2,
                                                                                    passenger.address3
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="fa-solid fa-edit"></i>
                                                                        </WarningButton>
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        <DangerButton
                                                                            onClick={() =>
                                                                                eliminar(
                                                                                    passenger.id,
                                                                                    passenger.name
                                                                                )
                                                                            }
                                                                        >
                                                                            <i className="fa-solid fa-trash"></i>
                                                                        </DangerButton>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={modal} onClose={closeModal}>
                    <Head title="Pasajeros" />

                    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                        <h2 className="p-3 text-lg font-medium text-gray-900">
                            {title}
                        </h2>
                        <form>
                            <InputLabel
                                for="client_type"
                                value="Tipo de Cliente"
                            />
                            <Select
                                id="client_type"
                                name="client_type"
                                ref={client_typeInput}
                                value={data.client_type}
                                required="required"
                                onChange={(e) =>
                                    setData("client_type", e.target.value)
                                }
                                type="select"
                                className="mt-1 mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                options={[
                                    "Seleccione... ",
                                    "Particular",
                                    "Empresa",
                                ]}
                                placeholder="Tipo de cliente"
                            />
                            <InputError
                                message={errors.client_type}
                                className="mt-2 "
                            />
                            <input
                                name="company"
                                ref={companyInput}
                                value={data.company}
                                onChange={(e) =>
                                    setData("company", e.target.value)
                                }
                                type="text"
                                placeholder="Empresa"
                                autoFocus
                                className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <InputError
                                message={errors.company}
                                className="mt-2 "
                            />
                            <input
                                name="name"
                                ref={nameInput}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                type="text"
                                placeholder="Nombre"
                                autoFocus
                                className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2 "
                            />
                            <input
                                name="surname"
                                ref={surnameInput}
                                value={data.surname}
                                onChange={(e) =>
                                    setData("surname", e.target.value)
                                }
                                type="text"
                                placeholder="Apellidos "
                                autoFocus
                                className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <InputError
                                message={errors.surname}
                                className="mt-2 "
                            />
                            <input
                                name="phone"
                                ref={phoneInput}
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                type="text"
                                placeholder="Teléfono"
                                autoFocus
                                className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2 "
                            />
                            <input
                                name="email"
                                ref={emailInput}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                type="text"
                                placeholder="Email"
                                autoFocus
                                className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2 "
                            />
                            <input
                                name="address"
                                ref={addressInput}
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                                type="text"
                                placeholder="Dirección"
                                autoFocus
                                className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <InputError
                                message={errors.address}
                                className="mt-2 "
                            />
                            <input
                                name="address2"
                                ref={address2Input}
                                value={data.address2}
                                onChange={(e) =>
                                    setData("address2", e.target.value)
                                }
                                type="text"
                                placeholder="Dirección 2"
                                autoFocus
                                className="mb-3 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm hidden"
                            />
                            <InputError
                                message={errors.address2}
                                className="mt-2 "
                            />
                            <input
                                name="address3"
                                ref={address3Input}
                                value={data.address3}
                                onChange={(e) =>
                                    setData("address3", e.target.value)
                                }
                                type="text"
                                placeholder="Dirección 3"
                                autoFocus
                                className="mb-3 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm hidden"
                            />
                            <InputError
                                message={errors.address3}
                                className="mt-2 "
                            />

                            <PrimaryButton
                                onClick={submit}
                                className="mt-4"
                                disabled={processing}
                            >
                                <i className="fa-solid fa-save p-1"></i>
                                Guardar
                            </PrimaryButton>

                            <DangerButton
                                onClick={() => closeModal(false)}
                                className="ml-4"
                                disabled={processing}
                            >
                                <i className="fa-solid fa-close p-1"></i>
                                <Link to="/passengers">Cancelar</Link>
                            </DangerButton>
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </form>
                    </div>
                </Modal>
            </>
        </AuthenticatedLayout>
    );
}
