import React from 'react';
import { Component } from 'react';
import MaterialTable from 'material-table';
import Chip from '@material-ui/core/Chip';

function getChipColor(env_index: number) {
  const colors = ['#c5e1a5', '#e1bee7', '#81d4fa', '#ffcc80', '#f48fb1', '#a5d6a7']
  return colors[env_index]
}

function getLookupValues(data:any, field:string) {
  const unique = new Set(data.map((item: any) => item[field] ));
  var values:any = {}
  unique.forEach((element:any) => {
    values[element] = element;
  });
  return values;
}

declare module "material-table" {
  export interface Column<RowData extends object> {
      width?: string;
  }
}

class App extends Component {
  componentDidMount() {
    fetch('http://localhost:3825/api/jobs')
    .then(res => res.json())
    .then((data) => {
      this.setState({ data: data.data, environments: getLookupValues(data.data, 'env') })
    })
    .catch(console.log)
  }

  tableRef = React.createRef();

  colRenderCount = 0;

  state = {
    data: [],
    environments: {}
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
            filtering: true,
          } 
        }
        columns={[
          { title: "Project", field: "project_name", defaultGroupOrder: 0 },
          { title: "Group", field: "group", },
          { title: "Environment", field: 'env', width:'7em', lookup:this.state.environments, 
            render: rowData =>
            <Chip size="small"
              label={rowData['env']}
              style={{backgroundColor: getChipColor(rowData['env_order'])}} /> },
          { title: "Job Name", field: "name", cellStyle: { fontWeight: 'bold' } },
          { title: "Schedule", field: "schedule_description" },
          { title: "Schedule Enabled", field: "scheduleEnabled", type: "boolean", width:'10em' },
          { title: "Description", field: "description" },
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
