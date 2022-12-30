import './App.css';
import NavbarMain from './components/NavbarMain';
import Mark from './components/Mark';
import Calculator from './components/Calculator';

function App() {
  return (
    <div>
      <NavbarMain />
      <div className="container">
        <div className="row__calculator ">
          <div className="col__left">
            <Mark />
          </div>
          <div className=" col__right">
            <Calculator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
