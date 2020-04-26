import React from 'react';
import { Component } from 'react';
import MaterialTable from 'material-table';
import Job from './Job';
import Environment from './Environment';
import { withTheme, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getApiUrl } from '../functions/getApiUrl';
import NextExecution from './NextExecution';


type JobListProps = {
  theme: Theme
}

function getLookupValues(data: any, field: string) {
  const unique = new Set(data.map((item: any) => item[field]));
  var values: any = {}
  unique.forEach((element: any) => {
    values[element] = element;
  });
  return values;
}

function isEnabled(data: any) {
  // Returns false if either the schedule or the execution is disabled or both
  if (data["scheduleEnabled"] && data["executionEnabled"]) {
    return true;
  }
  return false;
}


class JobList extends Component<JobListProps> {
  componentDidMount() {
    fetch(getApiUrl('api/jobs'))
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

  getDetails(data: any) {
    return (<Job data={data} />)
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
              { title: "Project", field: "project_name", defaultGroupOrder: 0 },
              { title: "Group", field: "group", cellStyle: { paddingLeft: '50px' } },
              {
                title: "Environment", field: 'env',
                lookup: this.state.environments, cellStyle: { maxWidth: '7em' },
                render: rowData =>
                  <Environment
                    label={rowData['env']}
                    index={rowData['env_order']}
                  />
              },
              { title: "Job Name", field: "name", cellStyle: { fontWeight: 'bold' } },
              { title: "Schedule", field: "schedule_description", cellStyle: { minWidth: '15em' } },
              {
                title: "Next Run", field: "next_execution",
                render: rowData => <NextExecution value={rowData["next_execution"]} />
              },
              {
                title: "Schedule Enabled", field: "scheduleEnabled", type: "boolean",
                cellStyle: { maxWidth: '6em' }
              },
              {
                title: "Execution Enabled", field: "executionEnabled", type: "boolean",
                cellStyle: { maxWidth: '6em' }
              },
              { title: "Description", field: "description", cellStyle: { whiteSpace: 'pre-line', minWidth: '20em' } },
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
