import './style.css'
import React, { useEffect, useState } from 'react'

import { Header } from '../../components/Header'
import { Card } from '../../components/Card'

export const Home = () => {
    

    const [entradas, setEntradas] = useState(2)
    const [saidas, setSaidas] = useState(1)
    const total = entradas - saidas;


    const [titulo, setTitulo] = useState('')
    const [valor, setValor] = useState(0)
    const [tipo, setTipo] = useState(false)
    // todo - ENTRADA = false
    // todo - SAIDA = true

    const [transferencias, setTransferencias] = useState([])

    function handleRegister(valor, titulo, tipo) {
        const transferencia = {
            valor: Number(valor).toFixed(2),
            titulo,
            tipo
        }

        setTransferencias([...transferencias, transferencia])
        console.log(transferencias)
    }

    return (
        <>
            <Header/>   
            
            <main className='content'>
                <div className='box-cards'>
                    <Card 
                        title={"Entradas"} 
                        icone={<i className="bi bi-arrow-up-circle-fill"></i>} values={entradas.toFixed(2)} 
                        identificador='entradas'
                    />

                    <Card 
                        title={"Saidas"} 
                        icone={<i className="bi bi-arrow-down-circle-fill"></i>} values={saidas.toFixed(2)} 
                        identificador='saidas'
                    />

                    <Card 
                        title={"Total"}
                        icone={<i className="bi bi-database-fill-check"></i>}
                        values={total.toFixed(2)}
                        
                    />
                </div>

                <div className='box-input'>
                    <div className='container-input'>
                        <label htmlFor="titulo">Titulo:</label>
                        <input
                            type="text"
                            placeholder='Titulo'
                            id='titulo'
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)} 
                        />
                    </div>


                    <div className='container-input'>
                        <label htmlFor="valor">Valor: R$</label>
                        <input
                            type="number"
                            placeholder='0'
                            id='valor'
                            value={valor}
                            min={1}
                            onChange={e => {
                                setValor(e.target.value)
                            }}
                        />
                    </div>

                    <div className="toggle-wrapper">
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                className="hidden-toggle" 
                                value={tipo} 
                                onChange={e => setTipo(e.target.value)}
                            />
                            <div className="slider">
                                <div className="button"></div>
                            </div>
                        </label>
                    </div>

                    <div className="submit">
                        <button 
                            disabled={(valor == 0 || titulo.length == 0)}
                            onClick={() => handleRegister(valor, titulo, tipo)}
                        >
                            Enviar
                        </button>
                    </div>
                </div>

                <div className='box-history'>
                    <table>
                        <thead>
                            <tr>
                                <th className='desc'>Titulo</th>
                                <th className='tipo'>Tipo</th>
                                <th className='val'>Valor (R$)</th>
                            </tr>
                        </thead>

                        {transferencias.map((transf) => {
                            return (
                            <tbody>
                                <td>{transf.titulo}</td>
                                <td>{transf.tipo ? 'Saida' : 'Entrada'}</td>
                                {
                                    transf.tipo ? 
                                    <td className='tipo-saida'>{(transf.valor)}</td>
                                    :
                                    <td className='tipo-entrada'>{(transf.valor)}</td>
                                }
                            </tbody>
                            )
                        })}



                    </table>
                </div>
    
            </main>     
        </>
    )
}