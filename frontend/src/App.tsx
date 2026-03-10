import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Checkpoint Authentification</h1>

      <form action="POST">
        <div className='input-div'>
          <label htmlFor="email">Email : </label><br />
          <input type="email" name="email" id="email" />
        </div>
        <div className='input-div'>
          <label htmlFor="password">Mot de passe : </label><br />
          <input type="password" name="password" id="password" />
        </div>
        <button>Valider</button>
      </form>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
