import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import useAuth from './useAuth';

function App() {

    //Aca en app tengo el enrutado entre los distintos componentes, hice un useAuth lo que hace es que si estas
    //registrado y estas en la base de deatos podes entrar al home, si no estas en la base de datos, no estas
    //permitido entrar al home
    const ProtectedRoute = ({children}) => {
        const { Authenticated } = useAuth()
        if (!Authenticated){
            return <Navigate to='/login'/>
        }
        return children;
    }

    return (
        <Router>
            <Routes>
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />
                <Route path='/' element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
            </Routes>
        </Router>
    );
}

export default App;  