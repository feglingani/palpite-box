import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-700 p-4'>
      <div className='container mx-auto text-center font-bold text-white'>
        Projeto desenvolvido por:{' '}
        <a className='hoover:underline' href='#'>Fernando Glingani</a> {' '}/{' '}
        <a className='hoover:underline' href='#'>Linkedin</a>{' '}/{' '}
        <a className='hoover:underline' href='#'>Github</a><br/>
        <img className='inline p-4' src='/logo_semana_fsm.png'/>
        <img className='inline p-4' src='/logo_devpleno.png'/>
      </div>
    </div>
  )
}

export default Footer