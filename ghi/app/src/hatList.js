import React from 'react';
import { Link } from 'react-router-dom';

function HatsColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const hat = data;
        console.log(hat)
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

            </div>
          </div>
        );
      })}
    </div>
  );
}

class HatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferenceColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8090/api/hats/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of conferences
        const data = await response.json();
        console.log(data)

        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let hat of data.hats) {
          const detailUrl = `http://localhost:8090/api/hats/${hat.id}/`;
          console.log(detailUrl)
          requests.push(fetch(detailUrl));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the conference
        // information into
        const conferenceColumns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const conferenceResponse of responses) {
          if (conferenceResponse.ok) {
            const details = await conferenceResponse.json();
            conferenceColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(conferenceResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        this.setState({conferenceColumns: conferenceColumns});
      }
    } catch (e) {
      console.error(e);
    }
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
          <h2>Upcoming conferences</h2>
          <div className="row gx-5 gy-3 row-cols-3">
            {this.state.conferenceColumns.map((conferenceList, index) => {
              return (
                <HatsColumn key={index} list={conferenceList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default HatList;