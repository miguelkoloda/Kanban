import './App.css'
import { KabhanPage } from './pages/KabhanPage'
import { ModalForm } from './components/Modal'
import { useState } from 'react'
import MudancaProvider from './context/MudancaProvider';

function App() {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
    <div className='container'>
      <h1 className='text-center fw-bold'>Tarefas Kabhan</h1>
      <div className='d-flex justify-content-end my-3'>
      <button className='btn btn-primary' onClick={() => setModal(true)} >Adicionar Tarefa</button>
      </div>
      <MudancaProvider>
         <KabhanPage/>
     {modal ? <ModalForm show={modal} fechar={() => setModal(false)}/> : null}
      </MudancaProvider>
    </div>
    </>
  )
}

export default App
