import React from 'react';

class HatForm extends React.Component {
constructor(props){
    super(props);
    this.state = {
        styleName:'',
        fabric:'',
        color:'',
        pictureUrl: '',
        locations: [],};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleFabricChange = this.handleFabricChange.bind(this);
    this.handlePictureChange= this.handlePictureChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
}

async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};
    delete data.locations;

    const hatUrl = 'http://localhost:8090/api/hats/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            const cleared = {
                styleName: '',
                fabric: '',
                color: '',
                pictureUrl:'',
                location: '',
              };
            this.setState(cleared);
        }
}

handleNameChange(event){
    const value = event.target.value;
    this.setState({styleName: value});
}

handleFabricChange(event){
  const value = event.target.value;
  this.setState({fabric: value});
}

handleColorChange(event){
    const value = event.target.value;
    this.setState({color: value});
}

handlePictureChange(event){
    const value = event.target.value;
    this.setState({pictureUrl: value})
}

handleLocationChange(event){
    const value = event.target.value;
    this.setState({location: value});
}

async componentDidMount(){
    const url = 'http://localhost:8100/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
        this.setState({locations: data.locations});
      }
    }

    render(){
    let spinnerClasses = 'd-flex justify-content-center mb-3';
let dropdownClasses = 'form-select d-none';
if (this.state.locations.length > 0) {
  spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
  dropdownClasses = 'form-select';
}
let messageClasses = 'alert alert-success d-none mb-0';
let formClasses = '';
if (this.state.hasSignedUp) {
  messageClasses = 'alert alert-success mb-0';
  formClasses = 'd-none';
}
    return(
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
            <form onSubmit={this.handleSubmit} id="create-hat-form">
                <h1 className='card-title'>Have a Hat</h1>
                <p className='mb-3'>
                    Hats for every need.
                </p>
                <div className={spinnerClasses} id="loading-conference-spinner">
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div className="mb-3">
                    <select onChange={this.handleLocationChange} value={this.state.location} required id="location" name = "location" className="form-select">
                      <option value="">Choose a where to place your hat.</option>
                      {this.state.locations.map(location => {
                        return(
                          <option key={location.href} value={location.href}>
                          {location.closet_name}
                          </option>  
                        );
                      })}
                    </select>
                  </div>
                  <p className='mb-3'>
                      Now, tell us more about your hat.
                  </p>
                  <div className = 'row'>
                    <div className = 'col'>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleNameChange} value={this.state.styleName} required placeholder="Style" type="text" name="styleName" id="styleName" className="form-control" />
                    <label htmlFor="styleName">Style</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleFabricChange} value={this.state.fabric} required placeholder="Fabric" type="text" name="fabric" id="fabric" className="form-control" />
                    <label htmlFor="fabric">Fabric</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name = "color" id="color" className="form-control" />
                    <label htmlFor="color">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handlePictureChange} value={this.state.pictureUrl} placeholder="Picture" required type="url" name = "pictureUrl" id="pictureUrl" className="form-control" />
                    <label htmlFor="pictureUrl">Picture</label>
                  </div>
                  </div>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form> 
              <div className="alert alert-success d-none mb-0" id="success-message">
                Your hat is complete.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    }
}

export default HatForm;