import React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default class FetchBankData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bank: [],
      branch: {},
      branchArr: [],
      loading: true,
      searchInput: "",
      tempData: [],
      reload: false
    }
    this.globalSearch = this.globalSearch.bind(this);
  }

  async componentDidMount() {
    const url = "https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI";
    const response = await fetch(url);
    const data = await response.json();
    let obj = {}
    data.map((dynamicData, Key) => {
      obj[dynamicData.branch] = dynamicData.branch
    })
    let branchArr = Object.keys(obj)
    this.setState({ bank: data, loading: false, branchArr: branchArr, tempData: data });
  }

  globalSearch = (e) => {
    let searchInput = e.target.value
    let { bank } = this.state;
    let filteredData = bank.filter(value => {
      return (
        value.ifsc.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.bank_name.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    this.state.tempData = filteredData
    this.setState({searchInput:searchInput, reload:!this.state.reload });
  }

  _onSelect = (event) => {
    var result = this.state.bank.filter(obj => {
      return obj.branch === event.value
    })
    this.state.tempData = result
    this.setState({reload:!this.state.reload});
  };

  render() {
    const options = this.state.branchArr;
    const columns = [{
      Header: 'ifsc',
      accessor: 'ifsc'
    }, {
      Header: 'branch',
      accessor: 'branch'
    }, {
      Header: 'address',
      accessor: 'address'
    }, {
      Header: 'bank_name',
      accessor: 'bank_name'
    }]
    if (this.state.loading) {
      return <div>loading...</div>
    } else if (!this.state.bank) {
      return <div>No Data Found</div>
    } else {
      return (
        <div>
          <label>
            <Dropdown controlClassName='myControlClassName' options={options} onChange={this._onSelect} placeholder="Select an option" />
          </label>
          <div className="main">
            <input className="input" value={this.state.searchInput} onChange={this.globalSearch} type="text" placeholder="search by ifsc or branch Name"/>
          </div>
          <ReactTable
            data={this.state.tempData}
            columns={columns}
            defaultPageSize={10}
            pageSizeOptions={[10, 20, 30]}
          />
        </div>
      )
    }
  }
}