
import Layout from '../components/Layout.js'
import FakeTagContainer from '../components/editor/FakeTagContainer'

const Component = (props) => {  
  return (<div>
    <h1>Component-xxx</h1>
    <div className="row">
      <div className="col-xs-8">
        <FakeTagContainer />
      </div>
      <div className="col-xs-4">
        
      </div>
    </div> 
  </div>
  
)}

export default Layout(Component)