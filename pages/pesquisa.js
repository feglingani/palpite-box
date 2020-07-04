import React, { useState } from 'react'
import Link from 'next/link'
import PageTitle from '../components/pageTitle';

const Pesquisa = () => {

  const notas = [0, 1, 2, 3, 4, 5];

  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    WhatsApp: '',
    Nota: null
  });

  const [ success, setSuccess ] = useState(false);
  const [ retorno, setRetorno ] = useState({});

  const save = async () => {

    //return 1;
    
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form)
      });
  
      const data = await response.json();
  
      setSuccess(true);
      setRetorno(data);
    } catch (error) {
      
    }
  };

  const onChange = evt => {
    const field = evt.target.name;
    const value = evt.target.value;
    setForm(old => ({
      ...old,
      [field]: value
    }));
  };

  return (
    <div className='pt-6'>
      <PageTitle title='Pesquisa' />
      <h1 className='text-center font-bold my-4 text-3x1'>Críticas e sugestões</h1>
      <p className='text-center'>
        O restaurante X sempre busca por atender melhor seus clientes.<br/>
        Por isso, estamos sempre abertos a ouvir sua opinião.
      </p>
      {!success && <div className='w-1/4 mx-auto'>
        <label className='font-bold'>Seu nome:</label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome}/>
        <label className='font-bold'>Email:</label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Email' onChange={onChange} name='Email' value={form.Email}/>
        <label className='font-bold'>WhatsApp:</label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='WhatsApp' onChange={onChange} name='WhatsApp' value={form.WhatsApp}/>
        <label className='font-bold'>Nota:</label>
        <div className='flex py-4'>
          {notas.map(nota => {
            return (
              <label className='block w-1/6 text-center'>{nota}<br/>
                <input type='radio'name='Nota' value={nota} onChange={onChange}></input>
              </label>
            )
          })}
        </div>
        <button className='bg-blue-400 px-6 py-4 font-bold rounded-lg shadow-lg hover:shadow' onClick={save}>Salvar</button>
      </div>}
      {/* <pre> {JSON.stringify(form, null, 2)} </pre> */}
      {success && <div className='w-2/4 mx-auto'>
        <p className='mb-6 text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4'>Obrigado pela sua participação</p>
        {
          retorno.showCoupom && <div className='text-center border p-4 mb-4'>
            Seu cupom: <br/>
              <span className='font-bold text-2xl'>{retorno.Cupom}</span>
            </div>
        }
        {
          retorno.showCoupom && <div className='text-center border p-4 mb-4'>
              <span className='font-bold block mb-2'>{retorno.Promo}</span>
              <br/>
              <span className='italic'>Tire um print ou foto desta tela e apresente ao garçon.</span>
            </div>
        }
      </div>}
    </div>
  )
}

export default Pesquisa