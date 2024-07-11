import './style.css'
import React, { useEffect, useState } from 'react'

import emptyImg from '../../assets/empty.svg'

import { Header } from '../../components/Header'
import { Card } from '../../components/Card'

export const Home = () => {

    const [entradas, setEntradas] = useState(Number)
    const [saidas, setSaidas] = useState(Number)
    const total = Number(entradas - saidas)


    const [titulo, setTitulo] = useState('')
    const [valor, setValor] = useState(Number)
    const [tipo, setTipo] = useState(false)


    const [transferencias, setTransferencias] = useState([])
    const [transferenciasFiltradas, setTransferenciasFiltradas] = useState([])

    function handleRegister(valor, titulo, tipo) {
        const transferencia = {
            valor: Number(valor).toFixed(2),
            titulo,
            tipo
        }
        setTransferencias([...transferencias, transferencia])

        setTitulo('')
        setTipo(false)
        setValor(Number(0))

        if (transferencia.tipo) {
            setSaidas(Number(saidas) + Number(transferencia.valor))
        } else {
            setEntradas(Number(entradas) + Number(transferencia.valor))
        }
    }

    function handleFilter(filter) {
        return transferencias.filter((transf) => {
            return transf.tipo == filter
        })
    }   

    function handleRemove(index) {
        let transferenciasNovas = [...transferencias];
        transferenciasNovas.splice(index, 1)
        setTransferencias(transferenciasNovas)
    }

    useEffect(() => {
        function getTransferysLocalStorage() {
            const tranferenciasLocal = localStorage.getItem('@financas')

            if (tranferenciasLocal) {
                setTransferencias(JSON.parse(tranferenciasLocal))
            }
        }

        getTransferysLocalStorage()
    }, [])

    useEffect(() => {

        function setTransferysLocalStorage() {
            if (transferencias) {
                localStorage.setItem('@financas', JSON.stringify(transferencias))
            }
        }
        function getEntradasAndSaidas() {
            const entradasList = transferencias.filter(transf => {
                if (!transf.tipo) {
                    return transf.valor
                }
            })
            const entradasTotal = entradasList.reduce((acumulador, valorAtual) => {
                return acumulador + Number(valorAtual.valor)
            }, 0)
                
            const saidasList = transferencias.filter(transf => {
                if (transf.tipo) {
                    return transf.valor
                }
            })
            const saidasTotal = saidasList.reduce((acumulador, valorAtual) => {
                return acumulador + Number(valorAtual.valor)
            }, 0)
    
            setEntradas(Number(entradasTotal))
            setSaidas(Number(saidasTotal))
        }

        setTransferysLocalStorage()
        getEntradasAndSaidas()

    }, [transferencias])

    return (
        <>
            <Header/>   
            
            <main className='content'>
                <div className='box-cards'>
                    <Card 
                        title={"Entradas"} 
                        icone={<i className="bi bi-arrow-up-circle-fill"></i>} values={Number(entradas).toFixed(2)}
                        identificador='entradas'
                        onClick={() => {
                            setTransferenciasFiltradas(
                                handleFilter(false)
                            )
                        }}
                    />

                    <Card 
                        title={"Saidas"} 
                        icone={<i className="bi bi-arrow-down-circle-fill"></i>} values={Number(saidas).toFixed(2)}
                        identificador='saidas'
                        onClick={() =>  {
                            setTransferenciasFiltradas(
                                handleFilter(true)
                            )
                        }}
                    />

                    <Card 
                        title={"Total"}
                        icone={<i className="bi bi-database-fill-check"></i>}
                        values={Number(total).toFixed(2)}
                        onClick={() => {
                            setTransferenciasFiltradas([])
                        }}
                        
                    />
                </div>

                <div className='box-input'>
                    <div className='container-input item-input'>
                        <label htmlFor="titulo">Titulo:</label>
                        <input
                            type="text"
                            placeholder='Titulo'
                            id='titulo'
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)} 
                        />
                    </div>


                    <div className='container-input item-input'>
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

                    <div className="toggle-wrapper item-input">
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                className="hidden-toggle" 
                                checked={tipo}
                                onChange={e => setTipo(e.target.checked)}
                                
                            />
                            <div className="slider">
                                <div className="button"></div>
                            </div>
                        </label>
                    </div>

                    <div className="submit item-input">
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
                        
                            {
                                transferencias.length > 0 ? 
                                    (
                                        transferenciasFiltradas.length > 0 ?  
                                            transferenciasFiltradas.map((transf) => {
                                                return (
                                                <tbody>
                                                    <td className='td-data-titulo'>
                                                        <span className='span-titulo'>{transf.titulo}</span>
                                                        <i 
                                                            className="bi bi-trash-fill button-remove"
                                                            onClick={
                                                                () => {
                                                                    let indexTransf = transferencias.indexOf(transf, 0)
                                                                    handleRemove(indexTransf)
                                                                    setTransferenciasFiltradas([])
                                                                }
                                                            }
                                                            >

                                                        </i>
                                                    </td>
                                                    <td>{transf.tipo ? 'Saida' : 'Entrada'}</td>
                                                    
                                                    {
                                                        transf.tipo  ?  
                                                            <td className='tipo-saida'>-{(transf.valor)}</td>
                                                        :
                                                            <td className='tipo-entrada'>+{(transf.valor)}</td>
                                                    }

                                                    
                                                </tbody>
                                                )
                                            })
                                        :
                                            transferencias.map((transf) => {
                                                return (
                                                <tbody>
                                                    <td className='td-data-titulo'>
                                                        <span className='span-titulo'>{transf.titulo}</span>
                                                        <i 
                                                            className="bi bi-trash-fill button-remove" 
                                                            onClick={
                                                                () => {
                                                                    let indexTransf = transferencias.indexOf(transf, 0)
                                                                    handleRemove(indexTransf)
                                                                }
                                                            }>

                                                            </i>
                                                    </td>
                                                    <td>{transf.tipo ? 'Saida' : 'Entrada'}</td>
                                                    
                                                    {
                                                        transf.tipo  ?  
                                                            <td className='tipo-saida'>-{(transf.valor)}</td>
                                                        :
                                                            <td className='tipo-entrada'>+{(transf.valor)}</td>
                                                    }

                                                    
                                                </tbody>
                                                )
                                            })  
                                    )
                                :
                                    (
                                        <tr>
                                            <td colSpan={3}>
                                                <div className='empty-box'>
                                                    <img src={emptyImg} alt="Ilustracao" height={250} />
                                                    <h3>Ops, nenhuma transferencia foi registrada!</h3>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                            }



                    </table>
                </div>
    
            </main>     
        </>
    )
}