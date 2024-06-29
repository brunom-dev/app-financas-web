import './style.css'
import React from 'react'

import { Header } from '../../components/Header'
import { Card } from '../../components/Card'

export const Home = () => {
    return (
        <>
            <Header />   
            
            <main>
                <div className='box-cards'>
                    <Card 
                        title={"Entradas"} 
                        icone={<i class="bi bi-arrow-up-circle-fill"></i>} values={1920.98} 
                        identificador='entradas'
                    />

                    <Card 
                        title={"Saidas"} 
                        icone={<i class="bi bi-arrow-down-circle-fill"></i>} values={1540.28} 
                        identificador='saidas'
                    />
                </div>
    
            </main>     
        </>
    )
}