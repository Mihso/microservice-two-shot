import React from 'react';
import { Link } from 'react-router-dom';

let selection = 0 // used to identify which hat waas selected to be deleted

let currentLocations=[{},{}];

function HatsColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
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
                Section: {newLocation.section_number} - Shelf: {newLocation.shelf_number}
                </p>
                <form onSubmit={current.handleSubmit} id="delete-hat-form">
                <button type="submit" onClick={()=>{selection = data.id;}} className="btn btn-primary">Destroy this hat</button>
                </form> 
            </div>
          </div>
        );
      })}
    </div>
  );
}

async function createList(props){
  try {
    const act = props
    const url = 'http://localhost:8090/api/hats/';
    let response = await fetch(url);
    if (response.ok) {

      const data = await response.json();

      const requests = [];
      for (let hat of data.hats) {
        const detailUrl = `http://localhost:8090/api/hats/${hat.id}/`;
        requests.push(fetch(detailUrl));
      }
      const locations = "http://localhost:8100/api/locations/" // get all locations from wardrobe
      response = await fetch(locations);
      if(response.ok){
        const data = await response.json();
        currentLocations = data.locations; // create record of all locations in wardrobe
      }
    

      const responses = await Promise.all(requests);


      const hatColumns = [[], [], []];

      let i = 0;
      for (const hatResponse of responses) {
        if (hatResponse.ok) {
          const details = await hatResponse.json();
          hatColumns[i].push(details);
          i = i + 1;
          if (i > 2) {
            i = 0;
          }
        } else {
          console.error(hatResponse);
        }
      }


      act.setState({hatColumns: hatColumns});
    }
  } catch (e) {
    console.error(e);
  }
}

class HatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hatColumns: [[], [], []],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state};

    const hatsUrl = `http://localhost:8090/api/hats/${selection}`;
    console.log(hatsUrl)
    const fetchConfig = {
        method: "delete",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(hatsUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();

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
          <h2>Hat selection and destruction.</h2>
          <div className="row gx-5 gy-3 row-cols-3">
            {this.state.hatColumns.map((hatList, index) => {
              return (
                <HatsColumn key={index} list={hatList} this={this}/>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default HatList;