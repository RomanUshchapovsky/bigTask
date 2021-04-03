import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import CartViewContainer from './components/CartView/CartViewContainer';
import CreateView from './components/CreateView/CreateView';
import EditView from './components/EditView/EditView';
import Header from './components/Header/Header';
import RegForm from './components/RegistrationForm/RegForm';
import MainView from './components/Main-View/Main-View';
import MainContext from "./Store/Context";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <MainContext>
          <div className='app-wrapper'>
            <Header />

            <div className='app-wrapper-content'>
              <Route path='/MainView'
                render={() => <MainView />} />
              <Route path='/CartView'
                render={() => <CartViewContainer />} />
              <Route path='/CreateView'
                render={() => <CreateView />} />
              <Route path='/EditView'
                render={() => <EditView />} />
              <Route path='/RegForm'
                render={() => <RegForm />} />
            </div>
            
          </div>
        </MainContext>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
