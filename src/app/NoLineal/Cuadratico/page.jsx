"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [variables, setVariales] = useState({
    x: "",
    a: "",
    b: "",
    c: "",
    m: "",
  });
  const [list, setList] = useState({ x: [], r: [] });
  const [tendencia, setTendencia] = useState({
    n: "",
    maximo: "",
  });
  const resolver = () => {
    const { x, a, b, c, m } = variables;

    // Verificar que todas las variables existan y no estén vacías
    if (x && a && b && c && m) {
      let i = 0;
      let xValues = [];
      let rValues = [];

      xValues[0] = Number(variables.x);
      rValues[0] = Number(variables.x) / (Number(variables.m) - 1);
      while (true) {
        const data =
          (Number(variables.a) * xValues[i] * xValues[i] +
            xValues[i] * Number(variables.b) +
            Number(variables.c)) %
          Number(variables.m);
        if (xValues.includes(data)) {
          xValues.push(data);
          rValues.push(data / (Number(variables.m) - 1));
          break;
        }
        xValues.push(data);
        rValues.push(data / (Number(variables.m) - 1));
        i++;
      }
      const n = rValues.length - 1;
      if (
        (Number(a) % 2 == 0) &
        (Number(c) % 2 != 0) &
        ((Number(b) - 1) % 4 == 1) &
        (Number(m) > 0 && (Number(m) & (Number(m) - 1)) == 0)
      ) {
        setTendencia({
          n: n,
          maximo: "Alcanzo su Maximo Periodo",
        });
      } else {
        setTendencia({
          n: n,
          maximo: "No Alcanzo su Maximo Periodo",
        });
      }
      setList({ x: xValues.slice(1), r: rValues.slice(1) });
    }
  };
  useEffect(() => {
    resolver();
  }, variables);
  return (
    <div className="w-full bg-zinc-100 min-h-lvh">
      <div className="w-full flex flex-wrap justify-center">
        <h1 className="text-4xl text-center w-full my-4 font-light">
          Algoritmo Congruencial Cuadrático
        </h1>
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl text-center w-full my-4 text-zinc-700">
            X<sub>i+1</sub> = (aX<sub>i</sub>
            <sup>2</sup> + bX<sub>i</sub> + c) mod (m)
          </h2>
          <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-200">
              <thead className="text-xs  uppercase bg-zinc-700 text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Variable
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-zinc-800 border-gray-700 hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    X
                  </th>
                  <td className="px-6 py-4">Semilla</td>
                  <td className="px-6 py-4">
                    <input
                      className="bg-transparent w-full outline-none"
                      type="number"
                      value={variables.x}
                      onChange={(e) => {
                        setVariales((prev) => ({
                          ...prev,
                          x: e.target.value,
                        }));
                      }}
                    />
                  </td>
                </tr>
                <tr className="border-b bg-zinc-800 border-gray-700 hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    a
                  </th>
                  <td className="px-6 py-4">
                    Constante Multiplicativa Cuadrática
                  </td>
                  <td className="px-6 py-4">
                    <input
                      className="bg-transparent w-full outline-none"
                      type="number"
                      value={variables.a}
                      onChange={(e) => {
                        setVariales((prev) => ({
                          ...prev,
                          a: e.target.value,
                        }));
                      }}
                    />
                  </td>
                </tr>
                <tr className="border-b bg-zinc-800 border-gray-700 hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    b
                  </th>
                  <td className="px-6 py-4">Constante Multiplicativa Lineal</td>
                  <td className="px-6 py-4">
                    <input
                      className="bg-transparent w-full outline-none"
                      type="number"
                      value={variables.b}
                      onChange={(e) => {
                        setVariales((prev) => ({
                          ...prev,
                          b: e.target.value,
                        }));
                      }}
                    />
                  </td>
                </tr>
                <tr className="border-b bg-zinc-800 border-gray-700 hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    c
                  </th>
                  <td className="px-6 py-4">Constante Aditiva</td>
                  <td className="px-6 py-4">
                    <input
                      className="bg-transparent w-full outline-none"
                      type="number"
                      value={variables.c}
                      onChange={(e) => {
                        setVariales((prev) => ({
                          ...prev,
                          c: e.target.value,
                        }));
                      }}
                    />
                  </td>
                </tr>
                <tr className="border-b bg-zinc-800 border-gray-700 hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                  >
                    m
                  </th>
                  <td className="px-6 py-4">Módulo</td>
                  <td className="px-6 py-4">
                    <input
                      className="bg-transparent w-full outline-none"
                      type="number"
                      value={variables.m}
                      onChange={(e) => {
                        setVariales((prev) => ({
                          ...prev,
                          m: e.target.value,
                        }));
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-center my-3">
            <button
              onClick={resolver}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2"
            >
              Resolver
            </button>
          </div>
        </div>
        {list.x.length > 0 && (
          <>
            <h1 className="text-4xl text-center w-full mt-4 mb-2 font-light">
              Resolución
            </h1>
            <div className="w-full mt-6 flex flex-wrap min-h-lvh">
              <div className="w-1/2 p-10 h-full">
                <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg h-full">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-200 h-full">
                    <thead className="text-xs bg-gray-700 text-white flex w-full">
                      <tr className="w-full flex">
                        <th scope="col" className="px-6 py-3 w-1/5">
                          i
                        </th>
                        <th scope="col" className="px-6 py-3 w-2/5">
                          X<sub>i</sub>
                        </th>
                        <th scope="col" className="px-6 py-3 w-2/5">
                          r<sub>i</sub>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="h-5/6 overflow-y-scroll w-full flex flex-col">
                      {list.x.map((xValue, index) => (
                        <tr
                          key={index}
                          className="flex w-full border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                        >
                          <td className="px-6 py-4 w-1/5 font-medium whitespace-nowrap text-white">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 w-2/5">{xValue}</td>
                          <td className="px-6 py-4 w-2/5">{list.r[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-1/2 p-10">
                <h2 className="text-3xl font-light my-2">
                  n: {tendencia.n - 1}
                </h2>
                <h2 className="text-3xl font-light my-2">{tendencia.maximo}</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
