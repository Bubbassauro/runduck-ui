import React from 'react';
import { Component } from 'react';
import MaterialTable from 'material-table';
import Job from './Job';
import Environment from './Environment';
import { withTheme, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

type JobListProps = {
  theme: Theme
}

function getLookupValues(data:any, field:string) {
  const unique = new Set(data.map((item: any) => item[field] ));
  var values:any = {}
  unique.forEach((element:any) => {
    values[element] = element;
  });
  return values;
}

function isEnabled(data:any) {
  // Returns false if either the schedule or the execution is disabled or both
  if (data["scheduleEnabled"] && data["executionEnabled"]) {
    return true;
  }
  return false;
}

declare module "material-table" {
  export interface Column<RowData extends object> {
      width?: string;
  }
}

class JobList extends Component<JobListProps> {
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
    environments: {},
  }

  getDetails(data:any) {
    return(<Job data={data}/>)
  }

  render() {
    return (
      <div>
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
        options={ 
          {
            paging: false,
            grouping: true,
            filtering: true,
            tableLayout: 'fixed',
            padding: 'dense',
            headerStyle: { position: 'sticky', top: 0 },
            maxBodyHeight: 'calc(100vh - 127px)',
            rowStyle: rowData => ({
              color: (isEnabled(rowData) ?
              this.props.theme.palette.text.primary :
              this.props.theme.palette.text.disabled)
            })
          } 
        }
        columns={[
          { title: "Project", field: "project_name", width:'12em', defaultGroupOrder: 0 },
          { title: "Group", field: "group", width:'15em', cellStyle: { paddingLeft: '50px'} },
          { title: "Environment", field: 'env', width:'7em', lookup:this.state.environments, 
            render: rowData =>
            <Environment
              label={rowData['env']}
              index={rowData['env_order']}
            />
          },
          { title: "Job Name", field: "name", width: '30%', cellStyle: { fontWeight: 'bold' } },
          { title: "Schedule", field: "schedule_description", width:'15em' },
          { title: "Schedule Enabled", field: "scheduleEnabled", type: "boolean", width:'6em' },
          { title: "Execution Enabled", field: "executionEnabled", type: "boolean", width:'6em' },
          { title: "Description", field: "description", width: '40%', cellStyle: { whiteSpace: 'pre-line'} },
        ]}
        data={this.state.data}
        detailPanel={rowData => {
          return this.getDetails(rowData)
        }}
        onRowClick={(event, rowData, togglePanel) => { togglePanel && togglePanel() }}
        title={<Box>
            <Typography variant="h6" component="span">Runduck</Typography>
            <Typography variant="body2" color="textSecondary" component="span">&nbsp;&nbsp;&nbsp;&nbsp;Jobs from multiple Rundecks</Typography>
          </Box>}
        />
        </div>
      </div>
    );
  }
}

const JobListWithTheme = withTheme(JobList);
export default JobListWithTheme;
