import { BrowserRouter, Route } from 'react-router-dom';
import AddChildTask from './components/AddChildTask/AddChildTask.jsx';
import FormEditTask from './components/FormEditTask/FormEditTask.jsx';
import Home from './components/Home/Home.jsx';
import NotFound from './components/NotFound/NotFound.jsx';



function App() {
  return (
    <BrowserRouter>
      <div >

        {/* <Route exact path='/' component={Landing} /> */}
        {/* <Route path='/home/:id' component={Detail} /> */}
        <Route exact path='/' component={Home} />
        <Route
          exact
          path="/task/editTask/:id"
          component={FormEditTask}
        />
        <Route
          exact
          path="/task/editTask"
          component={FormEditTask}
        />
        <Route
          exact
          path="/task/addChildTask/:id"
          component={AddChildTask}
        />
        <Route
          exact
          path="/task/addChildTask"
          component={AddChildTask}
        />
        {/* <Route path='/activities' component={Activity} /> */}
        {/* <Route path='*' component={NotFound} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
