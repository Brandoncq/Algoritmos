"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [variables, setVariables] = useState({
    x: [],
    m: "",
    n: "",
  });
  const [list, setList] = useState({ x: [], r: [] });
  const [tendencia, setTendencia] = useState({
    n: "",
  });

  const handleXChange = (index, value) => {
    const newX = [...variables.x];
    newX[index] = value;
    setVariables((prev) => ({
      ...prev,
      x: newX,
    }));
  };

  const resolver = () => {
    const { x, m, n } = variables;

    if (x && m && n) {
      let i = Number(n);
      let xValues = [];
      let rValues = [];
      for (let j = 0; j < Number(n); j++) {
        console.log(variables.x[j]);
        xValues.push(Number(variables.x[j]));
        rValues.push(Number(variables.x[j]) / (Number(variables.m) - 1));
      }
      while (true) {
        const data = (xValues[i - 1] + xValues[i - n]) % Number(variables.m);
        console.log(xValues[i - 1], xValues[i - n], i);
        console.log(data);
        if (xValues.includes(data)) {
          xValues.push(data);
          rValues.push(data / (Number(variables.m) - 1));
          break;
        }
        xValues.push(data);
        rValues.push(data / (Number(variables.m) - 1));
        i++;
      }
      const periodo = rValues.length - 1;

      setTendencia({ n: periodo });
      setList({ x: xValues, r: rValues });
    }
  };
  useEffect(() => {
    resolver();
  }, variables);

  const createTableInputs = () => {
    const n = parseInt(variables.n) || 0;
    return (
      <table className="w-full text-sm text-left rtl:text-right text-gray-200 rounded-lg">
        <thead className="text-xs bg-gray-700 text-white">
          <tr>
            {[...Array(n)].map((_, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                X<sub>{index + 1}</sub>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {[...Array(n)].map((_, index) => (
              <td
                className="px-6 py-4 bg-gray-800 border-gray-700 hover:bg-gray-600"
                key={index}
              >
                <input
                  className="bg-transparent w-full outline-none"
                  type="number"
                  value={variables.x[index] || ""}
                  onChange={(e) => handleXChange(index, e.target.value)}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="w-full bg-zinc-100 min-h-lvh">
      <div className="w-full flex flex-wrap justify-center">
        <h1 className="text-4xl text-center w-full my-4 font-light">
          Algoritmo Congruencial Aditivo
        </h1>
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl text-center w-full my-4 text-zinc-700">
            X<sub>i+1</sub> = (X<sub>i</sub> + X<sub>i-n</sub>) mod (m)
          </h2>
          <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-200">
              <thead className="text-xs uppercase bg-zinc-700 text-gray-300">
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
                    n
                  </th>
                  <td className="px-6 py-4">Cantidad de X</td>
                  <td className="px-6 py-4">
                    <input
                      className="bg-transparent w-full outline-none"
                      type="number"
                      value={variables.n}
                      onChange={(e) =>
                        setVariables((prev) => ({
                          ...prev,
                          n: e.target.value,
                        }))
                      }
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
                      onChange={(e) =>
                        setVariables((prev) => ({
                          ...prev,
                          m: e.target.value,
                        }))
                      }
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

        {/* Tabla dinámica de n columnas */}
        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg m-20">
          {variables.n && createTableInputs()}
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
                    <tbody className="h-5/6 overflow-y-auto w-full flex flex-col">
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
                <h2 className="text-3xl font-light my-2">n: {tendencia.n}</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
