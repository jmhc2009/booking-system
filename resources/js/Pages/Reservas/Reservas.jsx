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
import Select from "@/Components/Select";

export default function Reservas({ auth, bookings, vehicles }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [operation, setOperation] = useState(1);
    const dateInput = useRef();
    const hourInput = useRef();
    const flight_numberInput = useRef();
    const airlineInput = useRef();
    const fromInput = useRef();
    const untilInput = useRef();
    const passengerInput = useRef();
    const priceInput = useRef();
    const parking_priceInput = useRef();
    const total_priceInput = useRef();
    const vehicleInput = useRef();
    const statusInput = useRef();
    const observationInput = useRef();

    
    console.log(vehicles)

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
        date: "",
        hour: "",
        flight_number: "",
        airline: "",
        from: "",
        until: "",
        passenger: "",
        price: "",
        parking_price: "",
        total_price: "",
        vehicle: "",
        status: "",
        observation: "",
    });

    const openModal = (
        op,
        id,
        date,
        hour,
        flight_number,
        airline,
        from,
        until,
        passenger,
        price,
        parking_price,
        total_price,
        vehicle,
        status,
        observation
    ) => {
        setModal(true);
        setOperation(op);
        setData({
            date: "",
            hour: "",
            flight_number: "",
            airline: "",
            from: "",
            until: "",
            passenger: "",
            price: "",
            parking_price: "",
            total_price: "",
            vehicle: "",
            status: "",
            observation: "",
        });
        if (op === 1) {
            setTitle("Crear Reserva");
        } else {
            setTitle("Modificar Reserva");
            setData({
                id: id,
                date: date,
                hour: hour,
                flight_number: flight_number,
                airline: airline,
                from: from,
                until: until,
                passenger: passenger,
                price: price,
                parking_price: parking_price,
                total_price: total_price,
                vehicle: vehicle,
                status: status,
                observation: observation,
            });
        }
    };

    const closeModal = () => {
        setModal(false);
    };

    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route("bookings.store"), {
                onSuccess: () => {
                    ok("Reserva guardada");
                },
                onError: () => {
                    if (errors.date) {
                        reset(date);
                        dateInput.current.focus();
                    }
                    if (errors.hour) {
                        reset(hour);
                        hourInput.current.focus();
                    }
                    if (errors.flight_number) {
                        reset(flight_number);
                        flight_numberInput.current.focus();
                    }
                    if (errors.airline) {
                        reset(airline);
                        airlineInput.current.focus();
                    }
                    if (errors.from) {
                        reset(from);
                        fromInput.current.focus();
                    }
                    if (errors.until) {
                        reset(until);
                        untilInput.current.focus();
                    }
                    if (errors.passenger) {
                        reset(passenger);
                        passengerInput.current.focus();
                    }
                    if (errors.price) {
                        reset(price);
                        priceInput.current.focus();
                    }
                    if (errors.price_parking) {
                        reset(price_parking);
                        price_parkingInput.current.focus();
                    }
                    if (errors.total_price) {
                        reset(total_price);
                        total_priceInput.current.focus();
                    }
                    if (errors.status) {
                        reset(status);
                        statusInput.current.focus();
                    }
                    if (errors.observation) {
                        reset(observation);
                        observationInput.current.focus();
                    }
                },
            });
        } else {
            put(route("bookings.update", data.id), {
                onSuccess: () => {
                    ok("Reserva actualizada");
                },
                onError: () => {
                    if (errors.date) {
                        reset(date);
                        dateInput.current.focus();
                    }
                    if (errors.hour) {
                        reset(hour);
                        hourInput.current.focus();
                    }
                    if (errors.flight_number) {
                        reset(flight_number);
                        flight_numberInput.current.focus();
                    }
                    if (errors.airline) {
                        reset(airline);
                        airlineInput.current.focus();
                    }
                    if (errors.from) {
                        reset(from);
                        fromInput.current.focus();
                    }
                    if (errors.until) {
                        reset(until);
                        untilInput.current.focus();
                    }
                    if (errors.passenger) {
                        reset(passenger);
                        passengerInput.current.focus();
                    }
                    if (errors.price) {
                        reset(price);
                        priceInput.current.focus();
                    }
                    if (errors.price_parking) {
                        reset(price_parking);
                        price_parkingInput.current.focus();
                    }
                    if (errors.total_price) {
                        reset(total_price);
                        total_priceInput.current.focus();
                    }
                    if (errors.status) {
                        reset(status);
                        statusInput.current.focus();
                    }
                    if (errors.observation) {
                        reset(observation);
                        observationInput.current.focus();
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
                title: "Estás seguro de eliminar la reserva " + name,
                text: "Se perderá la información",
                icon: "question",
                showCancelButton: true,
                confirmButtonText:
                    '<i class="fa-solid fa-check"></i>Sí, eliminar',
                cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    destroy(route("bookings.destroy", id), {
                        onSuccess: () => {
                            ok("Reserva eliminada");
                        },
                    });
                }
            });
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <>
                <Head title="Reservas" />
                <div className="container flex">
                    <Sidebar />

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 w-full mt-2">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-2 text-gray-900">
                                <div className="container bg-white mt-2">
                                    <h1 className="ml-4 ">Reservas</h1>
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
                                                                Fecha
                                                            </th>

                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Hora
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                N° de Vuelo
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className=" px-6 py-4"
                                                            >
                                                                Aerolinea
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
                                                        {bookings.map(
                                                            (booking, i) => (
                                                                <tr
                                                                    key={
                                                                        booking.id
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
                                                                            booking.date
                                                                        }
                                                                    </td>

                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            booking.hour
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            booking.flight_number
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        {
                                                                            booking.airline
                                                                        }
                                                                    </td>
                                                                    <td className="whitespace-nowrap  px-6 py-4">
                                                                        <WarningButton
                                                                            onClick={() =>
                                                                                openModal(
                                                                                    2,
                                                                                    booking.id,
                                                                                    booking.date,
                                                                                    booking.hour,
                                                                                    booking.flight_number,
                                                                                    booking.airline,
                                                                                    booking.from,
                                                                                    booking.until,
                                                                                    booking.passenger,
                                                                                    booking.price,
                                                                                    booking.parking_price,
                                                                                    booking.total_price,
                                                                                    booking.vehicle,
                                                                                    booking.status,
                                                                                    booking.observation
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
                                                                                    booking.id,
                                                                                    booking.date
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
                        <Head title="Reservas" />

                        <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                            <h2 className="p-3 text-lg font-medium text-gray-900">
                                {title}
                            </h2>
                            
                           
                            <form>  
                                                       
                                
                                <input
                                    name="date"
                                    ref={dateInput}
                                    value={data.date}
                                    onChange={(e) =>
                                        setData("date", e.target.value)
                                    }
                                    type="date"
                                    placeholder="Fecha"
                                    autoFocus
                                    className="mb-3 w-60 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.date}
                                    className="mt-2 "
                                />
                                <label class="text-gray-700" for="time">
                                    <input
                                        name="hour"
                                        ref={hourInput}
                                        value={data.hour}
                                        onChange={(e) =>
                                            setData("hour", e.target.value)
                                        }
                                        type="time"
                                        placeholder="Hora"
                                        autoFocus
                                        className="mb-3 ml-3 w-60 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    />
                                </label>
                                <InputError
                                    message={errors.hour}
                                    className="mt-2 "
                                />
                                <input
                                    name="flight_number"
                                    ref={flight_numberInput}
                                    value={data.flight_number}
                                    onChange={(e) =>
                                        setData("flight_number", e.target.value)
                                    }
                                    type="number"
                                    placeholder="N° de Vuelo"
                                    autoFocus
                                    className="mb-3 inline-block mr-3 w-60 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.flight_number}
                                    className="mt-2 "
                                />
                                <Select
                                    id="airline"
                                    name="airline"
                                    ref={airlineInput}
                                    value={data.airline}
                                    onChange={(e) =>
                                        setData("airline", e.target.value)
                                    }
                                    type="select"
                                    placeholder="Aerolínea "
                                    autoFocus
                                    className="mb-3 inline-block w-60 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    options={[
                                        "Seleccione la aerolínea... ",
                                        "LATAM",
                                        "SKY",
                                        "JetSmart",
                                        "American Airline",
                                        "United Airline",
                                        "Delta",
                                        "Copa",
                                    ]}
                                />
                                <InputError
                                    message={errors.airline}
                                    className="mt-2 "
                                />
                                <Select
                                    id='from'
                                    name="from"
                                    ref={fromInput}
                                    value={data.from}
                                    onChange={(e) =>
                                        setData("from", e.target.value)
                                    }
                                    type="select"
                                    placeholder="Desde"
                                    autoFocus
                                    className="mb-3 inline-block mr-3 w-60 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    options={[
                                        "Comuna inicio",
                                        "Providencia",
                                        "Las Condes",
                                        "Santiago",

                                    ]}
                                />
                                <InputError
                                    message={errors.from}
                                    className="mt-2 "
                                />
                                <Select
                                    name="until"
                                    ref={untilInput}
                                    value={data.until}
                                    onChange={(e) =>
                                        setData("until", e.target.value)
                                    }
                                    type="select"
                                    placeholder="Hasta"
                                    autoFocus
                                    className="mb-3 inline-block w-60 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    options={[
                                        "Comuna de destino",
                                        "San Bernardo",
                                    ]}
                                />
                                <InputError
                                    message={errors.until}
                                    className="mt-2 "
                                />
                                <Select
                                    id="passenger"
                                    name="passenger"
                                    ref={passengerInput}
                                    value={data.passenger}
                                    onChange={(e) =>
                                        setData("passenger", e.target.value)
                                    }
                                    type="select"
                                    placeholder="Pasajero"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    options={[
                                        'Ingrese un pasajero',
                                        'Pasajero 1',
                                        'Pasajero 2',

                                    ]}
                                />

                                <InputError
                                    message={errors.passenger}
                                    className="mt-2 "
                                />
                                <input
                                    name="price"
                                    ref={priceInput}
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    type="text"
                                    placeholder="$ Precio"
                                    autoFocus
                                    className="mb-3 inline-block mr-3 w-40 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.price}
                                    className="mt-2 "
                                />
                                <input
                                    name="parking_price"
                                    ref={parking_priceInput}
                                    value={data.parking_price}
                                    onChange={(e) =>
                                        setData("parking_price", e.target.value)
                                    }
                                    type="text"
                                    placeholder="$ Estacionamiento"
                                    autoFocus
                                    className="mb-3 inline-block w-43 mr-3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.parking_price}
                                    className="mt-2 "
                                />
                                <input
                                    name="total_price"
                                    ref={total_priceInput}
                                    value={data.total_price}
                                    onChange={(e) =>
                                        setData("total_price", e.target.value)
                                    }
                                    type="text"
                                    placeholder="$ Total"
                                    autoFocus
                                    className="mb-3 inline-block w-43 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.total_price}
                                    className="mt-2 "
                                />

                               
                               
                                <Select                                                                    
                                    id="vehicle"
                                    name="vehicle"
                                    ref={vehicleInput}
                                    value={data.vehicle}
                                    required="required"
                                    onChange={(e) =>
                                        setData("vehicle", e.target.value)
                                    }
                                    type="select"
                                    placeholder="Móvil N°"
                                    autoFocus
                                    className="mb-3 mr-3 inline-block w-60 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    options={[
                                        "Seleccione el móvil... ",
                                        1,
                                        2,
                                        3,
                                    ]}
                                />                            
                                

                                <InputError
                                    message={errors.vehicle}
                                    className="mt-2 "
                                />

                                <Select
                                    id="status"
                                    name="status"
                                    ref={statusInput}
                                    value={data.status}
                                    required="required"
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    type="select"
                                    placeholder="Status"
                                    autoFocus
                                    className="mt-1 mb-3 inline-block w-60 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                    options={[
                                        "Seleccione Status... ",
                                        "Solicitud Enviada",
                                        "Agendada",
                                        "Realizada",
                                    ]}
                                />
                                <InputError
                                    message={errors.status}
                                    className="mt-2 "
                                />
                                <textarea
                                    name="observation"
                                    ref={observationInput}
                                    value={data.observation}
                                    onChange={(e) =>
                                        setData("observation", e.target.value)
                                    }
                                    type="text"
                                    placeholder="Observaciones"
                                    autoFocus
                                    className="mb-3 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError
                                    message={errors.observation}
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
