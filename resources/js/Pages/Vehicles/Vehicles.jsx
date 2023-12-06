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

export default function Vehicles({ auth, vehicles }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const numberInput = useRef();
    const typeInput = useRef();
    const brandInput = useRef();
    const modelInput = useRef();
    const patentInput = useRef();
    const yearInput = useRef();
    const tecnical_revision_yearInput = useRef();
    const seat_insuranceInput = useRef();
    const driver_insuranceInput = useRef();

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
        number: "",
        type: "",
        brand: "",
        model: "",
        patent: "",
        year: "",
        tecnical_revision_year: "",
        seat_insurance: "",
        driver_insurance: "",
    });

    const openModal = (
        op,
        id,
        number,
        type,
        brand,
        model,
        patent,
        year,
        tecnical_revision_year,
        seat_insurance,
        driver_insurance
    ) => {
        setModal(true);
        setOperation(op);
        setData({
            number: "",
            type: "",
            brand: "",
            model: "",
            patent: "",
            year: "",
            tecnical_revision_year: "",
            seat_insurance: "",
            driver_insurance: "",
        });
        if (op === 1) {
            setTitle("Crear Móvil");
        } else {
            setTitle("Modificar Móvil");
            setData({
                id: id,
                number: number,
                type: type,
                brand: brand,
                model: model,
                patent: patent,
                year: year,
                tecnical_revision_year: tecnical_revision_year,
                seat_insurance: seat_insurance,
                driver_insurance: driver_insurance,
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("vehicles.store"), {
                onSuccess: () => {
                    ok("Vehículo guardado");
                },
                onError: () => {
                    if (errors.number) {
                        reset(number);
                        numberInput.current.focus();
                    }
                    if (errors.type) {
                        reset(type);
                        typeInput.current.focus();
                    }
                    if (errors.brand) {
                        reset(brand);
                        brandInput.current.focus();
                    }
                    if (errors.model) {
                        reset(model);
                        modelInput.current.focus();
                    }
                    if (errors.patent) {
                        reset(patent);
                        patentInput.current.focus();
                    }
                    if (errors.year) {
                        reset(year);
                        yearInput.current.focus();
                    }
                    if (errors.tecnical_revision_year) {
                        reset(tecnical_revision_year);
                        tecnical_revision_yearInput.current.focus();
                    }
                    if (errors.seat_insurance) {
                        reset(seat_insurance);
                        seat_insuranceInput.current.focus();
                    }
                    if (errors.driver_insurance) {
                        reset(driver_insurance);
                        driver_insuranceInput.current.focus();
                    }
                },
            });
        } else {
            put(route("vehicles.update", data.id), {
                onSuccess: () => {
                    ok("Móvil actualizado");
                },
                onError: () => {
                    if (errors.number) {
                        reset(number);
                        numberInput.current.focus();
                    }
                    if (errors.type) {
                        reset(type);
                        typeInput.current.focus();
                    }
                    if (errors.brand) {
                        reset(brand);
                        brandInput.current.focus();
                    }
                    if (errors.model) {
                        reset(model);
                        modelInput.current.focus();
                    }
                    if (errors.patent) {
                        reset(patent);
                        patentInput.current.focus();
                    }
                    if (errors.year) {
                        reset(year);
                        yearInput.current.focus();
                    }
                    if (errors.tecnical_revision_year) {
                        reset(tecnical_revision_year);
                        tecnical_revision_yearInput.current.focus();
                    }
                    if (errors.seat_insurance) {
                        reset(seat_insurance);
                        seat_insuranceInput.current.focus();
                    }
                    if (errors.driver_insurance) {
                        reset(driver_insurance);
                        driver_insuranceInput.current.focus();
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
                title: "Estás seguro de eliminar el móvil " + name,
                text: "Se perderá la información",
                icon: "question",
                showCancelButton: true,
                confirmButtonText:
                    '<i class="fa-solid fa-check"></i>Sí, eliminar',
                cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route("vehicles.destroy", id), {
                        onSuccess: () => {
                            ok("Móvil eliminado");
                        },
                    });
                }
            });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <>
                <Head title="Móviles" />
                <div className="container flex">
                    <Sidebar />

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full mt-2">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-2 text-gray-900">
                                <div className="container bg-white mt-2">
                                    <h1 className="ml-4 ">Móviles</h1>
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
                                                                Movil N°
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Tipo
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Marca
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Modelo
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
                                                        {vehicles.map(
                                                            (vehicle, i) => (
                                                                <tr
                                                                    key={
                                                                        vehicle.id
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
                                                                            vehicle.number
                                                                        }
                                                                    </td>

                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            vehicle.type
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            vehicle.brand
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            vehicle.model
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        <WarningButton
                                                                            onClick={() =>
                                                                                openModal(
                                                                                    2,
                                                                                    vehicle.id,
                                                                                    vehicle.number,
                                                                                    vehicle.type,
                                                                                    vehicle.brand,
                                                                                    vehicle.model,
                                                                                    vehicle.patent,
                                                                                    vehicle.year,
                                                                                    vehicle.tecnical_revision_year,
                                                                                    vehicle.seat_insurance,
                                                                                    vehicle.driver_insurance,
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
                                                                                    vehicle.id,
                                                                                    vehicle.number
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
                        <Head title="Vehículos" />

                        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                            <h2 className="p-3 text-lg font-medium text-gray-900">
                                {title}
                            </h2>
                            <form>
                                <input
                                    name="number"
                                    ref={numberInput}
                                    value={data.number}
                                    onChange={(e) =>
                                        setData("number", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Movil N°"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.number}
                                    className="mt-2 "
                                />
                                <input
                                    name="type"
                                    ref={typeInput}
                                    value={data.type}
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Tipo de Vehículo"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.type}
                                    className="mt-2 "
                                />
                                <input
                                    name="brand"
                                    ref={brandInput}
                                    value={data.brand}
                                    onChange={(e) =>
                                        setData("brand", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Marca"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.brand}
                                    className="mt-2 "
                                />
                                <input
                                    name="model"
                                    ref={modelInput}
                                    value={data.model}
                                    onChange={(e) =>
                                        setData("model", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Modelo "
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.model}
                                    className="mt-2 "
                                />
                                <input
                                    name="patent"
                                    ref={patentInput}
                                    value={data.patent}
                                    onChange={(e) =>
                                        setData("patent", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Patente"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.patent}
                                    className="mt-2 "
                                />
                                <input
                                    name="year"
                                    ref={yearInput}
                                    value={data.year}
                                    onChange={(e) =>
                                        setData("year", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Año"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.year}
                                    className="mt-2 "
                                />
                                <input
                                    name="tecnical_revision_year"
                                    ref={tecnical_revision_yearInput}
                                    value={data.tecnical_revision_year}
                                    onChange={(e) =>
                                        setData("tecnical_revision_year", e.target.value)
                                    }
                                    type="date"
                                    placeholder="Revision técnica"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.tecnical_revision_year}
                                    className="mt-2 "
                                />
                                <input
                                    name="seat_insurance"
                                    ref={seat_insuranceInput}
                                    value={data.seat_insurance}
                                    onChange={(e) =>
                                        setData("seat_insurance", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Seguro de asiento"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.seat_insurance}
                                    className="mt-2 "
                                />
                                 <input
                                    name="driver_insurance"
                                    ref={driver_insuranceInput}
                                    value={data.driver_insurance}
                                    onChange={(e) =>
                                        setData("driver_insurance", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Seguro de conductor"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.driver_insurance}
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
