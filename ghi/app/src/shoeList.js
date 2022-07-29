import React from 'react'
import { Link } from 'react-router-dom'

let selection = 0 

let currentConf = [[],[],[]]

function ShoesColumn(props) {
    return (
        <div className="col">
            {props.list.map(data =>{
                const current =props.this
                const shoe = data
                return (
                    <div key={shoe.manufacturer} className="card mb-3 shadow mb-5 bg-body rounded">
                        <img src={shoe.picture_url} className="card-img-top" />
                        <div className ="card-body">
                            <h5 className="card-title">{shoe.manufacturer}</h5>
                            <h6 className="card-subtitle">{shoe.modelName}</h6>
                            <h7 className="card-subtitle mb-2 text-muted">
                                {shoe.color}
                            </h7>
                            <p className="card-text">
                                {shoe.bin.closet_name}
                            </p>
                        </div>
                        <div className="card-footer">
                            <p>
                                Section: {shoe.bin.bin_number}
                                - Bin: {shoe.bin.bin_number}
                            </p>
                            <form onSubmit={current.handleSubmit} id="delete-shoe-form">
                            <button type="submit" onClick={()=> {selection = data.id}} className="btn btn-primary">Delete</button>
                            </form>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


async function createList(props) {
    try{
        const act = props
        const url = 'http://localhost:8080/api/shoes/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const requests = [];
            for (let shoe of data.shoes) {
                const detailUrl = `http://localhost:8080/api/shoes/${shoe.id}/`
                requests.push(fetch(detailUrl))
            }

            const responses = await Promise.all(requests)

            const conferenceColumns = [[],[],[]]

            let i = 0
            for (const conferenceResponse of responses) {
                if (conferenceResponse.ok) {
                    const details = await conferenceResponse.json()
                    conferenceColumns[i].push(details)
                    i = i + 1
                    if (i > 2) {
                        i=0
                    }
                }else{
                console.error(conferenceResponse)
                }
            }

            currentConf = conferenceColumns 

            act.setState({conferenceColumns: conferenceColumns})
        }
    }catch (e) {
    console.error(e)
    }
}

class ShoeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            conferenceColumns: [[],[],[]]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(event){
        event.preventDefault()
        const data = {...this.state}

        const binUrl = `http://localhost:8080/api/shoes/${selection}`
        console.log(binUrl)
        const fetchConfig = {
            method:"delete",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
        }
        }
        const response = await fetch(binUrl, fetchConfig)
        if (response.ok) {
            const newBin = await response.json()
            console.log(newBin)
            const cleared = {
                set: "oopsies"
            }
            createList(this)
        }
    }

    async componentDidMount() {
        createList(this)
    }

    render() {
        return (
            <>
                <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                    <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
                    <h1 className="display-5 fw-bold">Shoes</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">
                            Get a load of these shoes! Ain't they the bees knees? 
                        </p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3"> Make a pair of shoes</Link>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h2>Upcoming Designs</h2>
                    <div className="row gx-5 gy-3 row-cols-3">
                        {this.state.conferenceColumns.map((conferenceList, index) => {
                            return (
                                <ShoesColumn key={index} list={conferenceList} this={this}/>
                            )
                        })}
                    </div>
                </div>
            </>
        )
    }
}

export default ShoeList