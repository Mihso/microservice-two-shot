import React from 'react'

class ShoeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturer: '',
            modelName: '',
            color: '',
            picture_url: '',
            bins: [],}
        

        this.handleManufacturerChange = this.handleManufacturerChange.bind(this)
        this.handleModelNameChange = this.handleModelNameChange.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handlePictureChange = this.handlePictureChange.bind(this)
        this.handleBinChange = this.handleBinChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    
}
async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state}
    delete data.bins
    
    const binUrl = 'http://localhost:8080/api/shoes/'
    console.log(binUrl)
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
        }
        const response = await(binUrl, fetchConfig)
        if (response.ok) {
            const newBin = await response.json()
            console.log(newBin)
            const cleared = {
                manufacturer: '',
                modelName: '',
                color: '',
                picture_url: '',
                bin: '',
            }
            this.setState(cleared)
        }
}
handleManufacturerChange(event){
    const value = event.target.value
    this.setState({manufacturer: value})
}
handleColorChange(event){
    const value = event.target.value
    this.setState({color: value})
}
handleModelNameChange(event){
    const value = event.target.value
    this.setState({modelName: value})
}
handlePictureChange(event){
    const value = event.target.value
    this.setState({picture_url: value})
}
handleBinChange(event) {
    const value = event.target.value
    this.setState({bin: value})
}

async componentDidMount(){
    const url = 'http://localhost:8100/api/bins/'

    const response = await fetch(url)
    if (response.ok){
        const data = await response.json()
            this.setState({bins: data.bins})
    }
}
    render() {
    let spinnerClasses = 'd-flex justify-content-center mb-3'
let dropdownClasses = 'form-select d-none'
if (this.state.bins.length > 0) {
    spinnerClasses = 'd-flex justify-content-center mb-3 d-none'
    dropdownClasses = 'd-none'
}
let messageClasses= 'alert alert-success d-none mb-0'
let formClasses = ''
if (this.state.hasSignedUp) {
    messageClasses='alert alert-success mb-0'
    formClasses = 'd-none'
}
    return(
        <div className="my-5 container">
            <div className="row">
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body">
                        <form onSubmit={this.handleSubmit} id="create-shoe-form">
                            <h1 className='card-title'>Want some shoes?</h1>
                            <p className='mb-3'>
                                Only the best shoes.
                            </p>
                            <div className={spinnerClasses} id="loading-conference-spinner">
                                <div className="spinner-grow text-secondary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <select onChange={this.handleBinChange} value={this.state.bin} required id="bin" name="bin" className="form-select">
                                    <option value="">Choose where you want your shoes to go</option>
                                    {this.state.bins.map(bin => {
                                        return(
                                            <option key={bin.href} value={bin.href}>
                                            {bin.href}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <p className="mb-3">
                                Tell us more about your shoes!
                            </p>
                            <div className='row'>
                                <div className = 'col'>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleManufacturerChange} value={this.state.manufacturer} required placeholder="Brand" type="text" name="manufacturer" id="manufacturer" className="form-control" />
                                <label htmlFor="manufacturer">Manufacturer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleModelNameChange} value={this.state.modelName} required placeholder='Style' type="text" name="modelName" id="modelName" className="form-control" />
                                <label htmlFor="modelName">Model Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                                <label htmlFor="color">Color</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handlePictureChange} value={this.state.picture_url} placeholder="Picture" required type="url" name="picture_url" id="pictureUrl" className="form-control"/>
                                <label htmlFor="picture_url">Picture</label>
                            </div>
                            </div>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className="alert alert-success d-none mb-0" id="success-message">
                            Your Shoes Are Complete.
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


}

export default ShoeForm
