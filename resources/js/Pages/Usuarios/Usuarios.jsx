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

export default function Usuarios({ auth, users }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const nameInput = useRef();
    const surnameInput = useRef();
    const phoneInput = useRef();
    const emailInput = useRef();
    const addressInput = useRef();
    const bankInput = useRef();
    const accountInput = useRef();
    const account_typeInput = useRef();

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
        name: "",
        surname: "",
        phone: "",
        email: "",
        address: "",
        bank: "",
        account: "",
        account_type: "",
    });

    const openModal = (
        op,
        id,
        name,
        surname,
        phone,
        email,
        address,
        bank,
        account,
        account_type
    ) => {
        setModal(true);
        setOperation(op);
        setData({
            name: "",
            surname: "",
            phone: "",
            email: "",
            address: "",
            bank: "",
            account: "",
            account_type: "",
        });
        if (op === 1) {
            setTitle("Crear conductor");
        } else {
            setTitle("Modificar conductor");
            setData({
                id: id,
                name: name,
                surname: surname,
                phone: phone,
                email: email,
                address: address,
                bank: bank,
                account: account,
                account_type: account_type,
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("drivers.store"), {
                onSuccess: () => {
                    ok("Conductor guardado");
                },
                onError: () => {
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
                    if (errors.bank) {
                        reset(bank);
                        bankInput.current.focus();
                    }
                    if (errors.account) {
                        reset(account);
                        accountInput.current.focus();
                    }
                    if (errors.account_type) {
                        reset(account_type);
                        account_typeInput.current.focus();
                    }
                },
            });
        } else {
            put(route("drivers.update", data.id), {
                onSuccess: () => {
                    ok("Conductor actualizado");
                },
                onError: () => {
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
                    if (errors.bank) {
                        reset(bank);
                        bankInput.current.focus();
                    }
                    if (errors.account) {
                        reset(account);
                        accountInput.current.focus();
                    }
                    if (errors.account_type) {
                        reset(account_type);
                        account_typeInput.current.focus();
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
                title: "Estás seguro de eliminar el conductor " + name,
                text: "Se perderá la información",
                icon: "question",
                showCancelButton: true,
                confirmButtonText:
                    '<i class="fa-solid fa-check"></i>Sí, eliminar',
                cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route("drivers.destroy", id), {
                        onSuccess: () => {
                            ok("Conductor eliminado");
                        },
                    });
                }
            });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <>
                <Head title="Conductores" />
                <div className="container flex">
                    <Sidebar />

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full mt-2">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-2 text-gray-900">
                                <div className="container bg-white mt-2">
                                    <h1 className="ml-4 ">
                                        Conductores
                                    </h1>
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
                                                        {drivers.map(
                                                            (driver, i) => (
                                                                <tr
                                                                    key={
                                                                        driver.id
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
                                                                            driver.name
                                                                        }
                                                                    </td>

                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            driver.phone
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                             driver.email
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            driver.address
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        <WarningButton
                                                                            onClick={() =>
                                                                                openModal(
                                                                                    2,
                                                                                    driver.id,
                                                                                    driver.name,
                                                                                    driver.surname,
                                                                                    driver.phone,
                                                                                    driver.email,
                                                                                    driver.address,
                                                                                    driver.bank,
                                                                                    driver.account,
                                                                                    driver.account_type

                                                                                    
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
                                                                                    driver.id,
                                                                                    driver.name
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
                        <Head title="Conductores" />

                        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                            <h2 className="p-3 text-lg font-medium text-gray-900">
                                {title}
                            </h2>
                            <form>
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
                                    placeholder="Apellidos"
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
                                    placeholder="Email "
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
                                    name="bank"
                                    ref={bankInput}
                                    value={data.bank}
                                    onChange={(e) =>
                                        setData("bank", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Banco"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.bank}
                                    className="mt-2 "
                                />
                                <input
                                    name="account"
                                    ref={accountInput}
                                    value={data.account}
                                    onChange={(e) =>
                                        setData("account", e.target.value)
                                    }
                                    type="text"
                                    placeholder="N° de cuenta"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.account}
                                    className="mt-2 "
                                />
                                <input
                                    name="account_type"
                                    ref={account_typeInput}
                                    value={data.account_type}
                                    onChange={(e) =>
                                        setData("account_type", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Tipo de cuenta"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.account_type}
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
