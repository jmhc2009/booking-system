import PrimaryButton from "@/Components/PrimaryButton";
import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import WarningButton from "@/Components/WarningButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";

export default function Empresas({ auth, companies }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const business_nameInput = useRef();
    const rutInput = useRef();
    const turnInput = useRef();
    const addressInput = useRef();
    const phoneInput = useRef();
    const emailInput = useRef();
    console.log(companies)

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
        business_name: "",
        rut: "",
        turn: "",
        address: "",
        phone: "",
        email: "",
    });

    const openModal = (
        op,
        id,
        business_name,
        rut,
        turn,
        address,
        phone,
        email
    ) => {
        setModal(true);
        setOperation(op);
        setData({
            business_name: "",
            rut: "",
            turn: "",
            address: "",
            phone: "",
            email: "",
        });
        if (op === 1) {
            setTitle("Crear Empresa");
        } else {
            setTitle("Modificar Empresa");
            setData({
                id: id,
                business_name: business_name,
                rut: rut,
                turn: turn,
                address: address,
                phone: phone,
                email: email,
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("companies.store"), {
                onSuccess: () => {
                    ok("Empresa guardada");
                },
                onError: () => {
                    if (errors.business_name) {
                        reset(business_name);
                        business_nameInput.current.focus();
                    }
                    if (errors.rut) {
                        reset(rut);
                        rutInput.current.focus();
                    }
                    if (errors.turn) {
                        reset(turn);
                        turnInput.current.focus();
                    }
                    if (errors.address) {
                        reset(address);
                        addressInput.current.focus();
                    }
                    if (errors.phone) {
                        reset(phone);
                        phoneInput.current.focus();
                    }
                    if (errors.email) {
                        reset(email);
                        emailInput.current.focus();
                    }
                },
            });
        } else {
            put(route("companies.update", data.id), {
                onSuccess: () => {
                    ok("Empresa actualizada");
                },
                onError: () => {
                    if (errors.business_name) {
                        reset(business_name);
                        business_nameInput.current.focus();
                    }
                    if (errors.rut) {
                        reset(rut);
                        rutInput.current.focus();
                    }
                    if (errors.turn) {
                        reset(turn);
                        turnInput.current.focus();
                    }
                    if (errors.address) {
                        reset(address);
                        addressInput.current.focus();
                    }
                    if (errors.phone) {
                        reset(phone);
                        phoneInput.current.focus();
                    }
                    if (errors.email) {
                        reset(email);
                        emailInput.current.focus();
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
                title: "Estás seguro de eliminar la empresa " + name,
                text: "Se perderá la información",
                icon: "question",
                showCancelButton: true,
                confirmButtonText:
                    '<i class="fa-solid fa-check"></i>Sí, eliminar',
                cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route("companies.destroy", id), {
                        onSuccess: () => {
                            ok("Empresa eliminada");
                        },
                    });
                }
            });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <>
                <Head title="Empresas" />
                <div className="container flex">
                    <Sidebar />

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full mt-2">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-2 text-gray-900">
                                <div className="container bg-white mt-2">
                                    <h1 className="ml-4 ">Empresas</h1>
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
                                                                Usuario
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
                                                                Dirección
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
                                                                Email
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
                                                        {companies.map(
                                                            (company, i) => (
                                                                <tr
                                                                    key={
                                                                        company.id
                                                                    }
                                                                    className="border-b"
                                                                >
                                                                    <td className="whitespace-nowrap  px-6 py-4 font-medium">
                                                                        {
                                                                            auth
                                                                                .user
                                                                                .name
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            company.business_name
                                                                        }
                                                                    </td>

                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            company.address
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            company.phone
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            company.email
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        <WarningButton
                                                                            onClick={() =>
                                                                                openModal(
                                                                                    2,
                                                                                    company.id,
                                                                                    company.business_name,
                                                                                    company.rut,
                                                                                    company.turn,
                                                                                    company.address,
                                                                                    company.phone,
                                                                                    company.email
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
                                                                                    company.id,
                                                                                    company.business_name
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
                    <Modal show={modal} onClose={closeModal}>
                        <Head title="Empresas" />

                        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                            <h2 className="p-3 text-lg font-medium text-gray-900">
                                {title}
                            </h2>
                            <form>
                                <input
                                    name="business_name"
                                    ref={business_nameInput}
                                    value={data.business_name}
                                    onChange={(e) =>
                                        setData("business_name", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Razón social"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.business_name}
                                    className="mt-2 "
                                />
                                <input
                                    name="rut"
                                    ref={rutInput}
                                    value={data.rut}
                                    onChange={(e) =>
                                        setData("rut", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Rut"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.rut}
                                    className="mt-2 "
                                />
                                <input
                                    name="turn"
                                    ref={turnInput}
                                    value={data.turn}
                                    onChange={(e) =>
                                        setData("turn", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Giro"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.turn}
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
                                    placeholder="Dirección "
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.address}
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
                                    <Link to="/dashboard">Cancelar</Link>
                                </DangerButton>
                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </form>
                        </div>
                    </Modal>
                </div>
            </>
        </AuthenticatedLayout>
    );
}
