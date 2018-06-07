import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

function imageFormatter(cell, row){
  return (<img style={{width:50}} src={cell} alt="flag"/>)
}

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sort: false,
      errors: {},
      country: [],
      regions: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  showRegions = () => {
    let keys = []
    for (let key in this.state.regions) {
      keys.push(key + ' (' + this.state.regions[key] + ') ');
      console.log(this.state.regions);
    }
    return keys;
  }

  showSubregions = () => {
    let keys = []
    for (let key in this.state.subregions) {
      keys.push(key + ' (' + this.state.subregions[key] + ') ');
      console.log(this.state.subregions);
    }
    return keys;
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  toggle(e) {
    this.setState({sort: !this.state.sort});
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({errors: ""});
    this.setState({country: [], loading: true});
    axios.get('/api/country.php', {
      params: {
        name: this.state.name,
        sort: this.state.sort
      }
    })
      .then(res => {
        let regions = {};
        let subregions = {};
        res.data.forEach(function (item) {
          if (!(item.region in regions)) {
            if (item.region === '') item.region = "Other";
            regions[item.region] = 1;
          } else {
            regions[item.region]++;
          }
          if (!(item.subregion in subregions)) {
            if (item.region === '') item.region = "Other";
            subregions[item.subregion] = 1;
          } else {
            subregions[item.subregion]++;
          }
      });
        this.setState({country: res.data, regions, subregions});
      })
      .catch(err => this.setState({errors: err.response.data}));
  }
  

  render() {
    const { errors } = this.state;
    const { country } = this.state;
    const checkedOrNot = [];
    checkedOrNot.push(
      <p>{this.state.sort ? 'Unchecked' : 'Checked'}</p>
    );
    const checkbox = (
      <div>
        <input 
        type="checkbox"
        onClick={this.toggle.bind(this)}
        className="mt-2 ml-1"
        /> sort by population
      </div>
    );
    const options = {
      page: 1,
      prePage:  '<',
      nextPage: '>',
      firstPage: '<<',
      lastPage: '>>',
      sizePerPage: 5,
      hideSizePerPage: true
    }

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <form onSubmit={this.onSubmit}>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control form-control-lg"
                    placeholder="enter country name or country code" 
                    name="name" 
                    value={this.state.name}
                    onChange={this.onChange} />                         
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-info" value="Search" />
                  </span>
                </div>
                {checkbox}
                <h4 className="pt-3" style={{textAlign:"center"}}> {errors.message}</h4>
                </form>
              </div>
            </div>
            <div className={classnames('row', {'d-none': !country[0]})}>
              <div className="col-md-12 mt-3">
              <BootstrapTable data={ country } 
                              bordered={ false }
                              pagination={true}
                              options={options}>
                <TableHeaderColumn dataField='name'
                                   dataAlign='left'
                                   headerAlign='left'
                                   width='18%'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='alpha2Code'
                                   dataAlign='left'
                                   headerAlign='left'
                                   width='10%'>Code</TableHeaderColumn>
                <TableHeaderColumn dataField='flag' 
                                   dataFormat={imageFormatter}
                                   dataAlign='left'
                                   headerAlign='left'                               
                                   width="10%">Flag</TableHeaderColumn>
                <TableHeaderColumn dataField='region'
                                   dataAlign='left'
                                   headerAlign='left'
                                   width="14%">Region</TableHeaderColumn>
                <TableHeaderColumn dataField='subregion'
                                   dataAlign='left'
                                   headerAlign='left'
                                   width="14%">Subregion</TableHeaderColumn>
                <TableHeaderColumn dataField='population' 
                                   isKey={ true }                                 
                                   dataAlign='right'
                                   headerAlign='right'
                                   width="14%">Population</TableHeaderColumn>
                <TableHeaderColumn dataField='languages'
                                   dataAlign='left'
                                   headerAlign='left'
                                   width="14%">Language(s)</TableHeaderColumn>
              </BootstrapTable>
              <p>Total Countries: {country.length}</p>
              <p>Regions: {this.showRegions()}</p>
              <p>Subregions: {this.showSubregions()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
