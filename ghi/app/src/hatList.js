import React from 'react';
import { Link } from 'react-router-dom';

let selection = 0

let currentConf = [[],[],[]]

<<<<<<< HEAD
=======
let currentLocations=[{},{}];

>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
function HatsColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
<<<<<<< HEAD
        const current = props.this
        const hat = data;
        return (
          <div key={hat.styleName} className="card mb-3 shadow mb-5 bg-body rounded">
            <img src={hat.pictureUrl} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{hat.styleName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {hat.color}
              </h6>
              <p className="card-text">
                {hat.location.closet_name}
              </p>
            </div>
            <div className="card-footer">
                <p>
                Section: {hat.location.section_number}
                - Shelf: {hat.location.shelf_number}
                </p>
                <form onSubmit={current.handleSubmit} id="delete-hat-form">
                <button type="submit" onClick={()=>{selection = data.id;}} className="btn btn-primary">Delete</button>
=======
        const current = props.this;
        let newLocation = {}
        for(let loc of currentLocations)
        {
          if(loc.href === data.location.href)
          {newLocation = loc;}
        }


        return (
          <div key={data.styleName} className="card mb-3 shadow mb-5 bg-body rounded">
            <img src={data.pictureUrl} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{data.styleName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Color: {data.color}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Fabric: {data.fabric}
              </h6>
            </div>
            <div className="card-footer">
              <p className="card-text">
                Inside wardrobe {newLocation.closet_name}
              </p>
                <p>
                Section: {newLocation.section_number}
                - Shelf: {newLocation.shelf_number}
                </p>
                <form onSubmit={current.handleSubmit} id="delete-hat-form">
                <button type="submit" onClick={()=>{selection = data.id;}} className="btn btn-primary">Destroy this hat</button>
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
                </form> 
            </div>
          </div>
        );
      })}
    </div>
  );
}

<<<<<<< HEAD

=======
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
async function createList(props){
  try {
    const act = props
    const url = 'http://localhost:8090/api/hats/';
<<<<<<< HEAD
    const response = await fetch(url);
=======
    let response = await fetch(url);
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
    if (response.ok) {

      const data = await response.json();

      const requests = [];
      for (let hat of data.hats) {
        const detailUrl = `http://localhost:8090/api/hats/${hat.id}/`;
        requests.push(fetch(detailUrl));
      }
<<<<<<< HEAD

=======
      const locations = "http://localhost:8100/api/locations/"
      response = await fetch(locations);
      if(response.ok){
        const data = await response.json();
        currentLocations = data.locations;
      }
    
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f

      const responses = await Promise.all(requests);


<<<<<<< HEAD
      const conferenceColumns = [[], [], []];
=======
      const hatColumns = [[], [], []];
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f

      let i = 0;
      for (const conferenceResponse of responses) {
        if (conferenceResponse.ok) {
          const details = await conferenceResponse.json();
<<<<<<< HEAD
          conferenceColumns[i].push(details);
=======
          hatColumns[i].push(details);
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
          i = i + 1;
          if (i > 2) {
            i = 0;
          }
        } else {
          console.error(conferenceResponse);
        }
      }

<<<<<<< HEAD
      currentConf = conferenceColumns

      act.setState({conferenceColumns: conferenceColumns});
=======
      currentConf = hatColumns

      act.setState({hatColumns: hatColumns});
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
    }
  } catch (e) {
    console.error(e);
  }
}

class HatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      conferenceColumns: [[], [], []],
=======
      hatColumns: [[], [], []],
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};

<<<<<<< HEAD
    const locationUrl = `http://localhost:8090/api/hats/${selection}`;
    console.log(locationUrl)
=======
    const hatsUrl = `http://localhost:8090/api/hats/${selection}`;
    console.log(hatsUrl)
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
    const fetchConfig = {
        method: "delete",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
<<<<<<< HEAD
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
            const newLocation = await response.json();
            console.log(newLocation);
            const cleared = {
              set: "oops"
              };
=======
        const response = await fetch(hatsUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();

>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
            createList(this);
        }
  }

  async componentDidMount() {
    createList(this);
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
          <h1 className="display-5 fw-bold">Hats</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
            Lots of hats, look at these hats, you want the hats.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Make a Hat</Link>
            </div>
          </div>
        </div>
        <div className="container">
<<<<<<< HEAD
          <h2>Upcoming conferences</h2>
          <div className="row gx-5 gy-3 row-cols-3">
            {this.state.conferenceColumns.map((conferenceList, index) => {
              return (
                <HatsColumn key={index} list={conferenceList} this={this}/>
=======
          <h2>Hat selection and destruction.</h2>
          <div className="row gx-5 gy-3 row-cols-3">
            {this.state.hatColumns.map((hatList, index) => {
              return (
                <HatsColumn key={index} list={hatList} this={this}/>
>>>>>>> f7d3fd543e31b5fbb276e124b82aef8b51fdc63f
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default HatList;