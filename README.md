# HR Workflow

## How to run?
The project can be accessed via link: [www.google.com](https://www.google.com)

To run the project locally do the following:

1. clone the project repo. Run the following command:

    ` git clone git@github.com:thakurhimself/tredence-hr-workflow.git hr-workflow`

2. Enter the project repo directory. If using bash run the following command:\

    ` cd hr-workflow `

3. Start the program by running following commands on the terminal: 

    ` npm install `

    ` npm run dev `


## Architecture
The architecture of the app can be divided into four architectural components:

1. **State**
2. **Components**
3. **Workers**
4. **API Endpoints**

### State
The state of the App is as follows:

1.  Node and edge management: 
    The nodes and edges inside the canvas is managed in the **RootComponet** file inside components. It manages all the state related to the nodes and edges.

2.  Node form fields:
    The node form fields are managed in separate context called **WorkflowContext** and is provided through **WorkflowProvider**. Appropiate hooks are provided with regards to functionality of this context.

3.  Local state:
    The local states belong to the component where it is needed.


### Components
The components of the App are as follows:

1.  Core componenets:
    Core components implements the core features of the app. The core components include ` components/nodes `, ` components\edges `, ` components\editNodeForms `. 
    One can add as many nodes, edges, and node forms in the application. You simply just register them in the registry and they will work seemlessly.

2.  Helper components:
    They exist to contribute visual elements to the App. The Panel and Portal component inside the component are helper components.


### Workers
Workers are helper constants, functions and utilities that help in implementing the core features of the App.
There are following workers:

1.  **flowConfig**: This holds the registry of the custom nodes and edges. When you add new nodes and edges you register those
    in the corresponding registries.

2. **nodeSelector**: This worker returns the node form to edit based on the id and type of the node.

3. **workflowSimulationUtils**: This worker hosts many utility functions that are used in simulate API endpoint.

4. **exportJSON**: This worker serialises and exports workflow in the json file and downloads it the user's device.


### API Endpoints
The API endpoints are defined to serve the data and action needs of the App.


## Design Decisions


