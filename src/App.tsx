import React from 'react';
import { Component } from 'react';
import MaterialTable from 'material-table';


class App extends Component {
  componentDidMount() {
    fetch('http://localhost:3825/api/jobs')
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data.data })
    })
    .catch(console.log)
  }

  tableRef = React.createRef();

  colRenderCount = 0;

  state = {
    data: []
  }

  render() {
    return (
      <div className="App">
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
        options={ 
          {
            paging: false,
            grouping: true,
          } 
        }
        columns={[
          { title: "Project", field: "project_name", defaultGroupOrder: 0 },
          { title: "Group", field: "group" },
          { title: "Job Name", field: "name" },
          { title: "Job Name QA", field: "name_qa" },
          { title: "Job Name Prod", field: "name_prod" },
          { title: "Description QA", field: "description_qa" },
          { title: "Description Prod", field: "description_prod" },
        ]}
        data={this.state.data}
        title="Rundeck Jobs"
      />
        </div>
      </div>
    );
  }
}

export default App;
