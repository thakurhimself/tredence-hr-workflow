# HR Workflow

## How to run?
The project can be accessed via link: [https://t-hr-wf.vercel.app/](https://t-hr-wf.vercel.app/)

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

1.  State for the node selection for editing is globally managed to manage it across the components.

2.  Node form fields are globally stored in the key-value pair where key is the node's id and value is the entries of the node 
    form fields. This allows simple and scalable way to store node form fields for different nodes or different instances of same
    node type.

3.  There are separate nodes and nodes' edit form component separating the concern of the displaying and interacting with the 
    node's form fields.

4.  Custom nodes have pair of incoming handle, for incoming edges, and outgoing handle for the outgoing edges. The start and end 
    node have only one corresponding outgoing and incoming handle for edges.

5.  Edges and nodes have delete button for the deletion of the edges and nodes.


## What I have completed vs What I would have added with more time.

### I have completed the following things in the assessement:

Functional Requirements

1. Workflow Canvas (React flow)
    * Node Types: Start Node, Task Node, Approval Node, Automated Step Node, and End Node.
    * Supported Canvas Actions: 
        * Drag nodes from a sidebaron to the canvas
        * Connect nodes with edges
        * Select a node to edit it
        * Delete nodes/edges
        * Auto-validate basic constraint: start node must be the first.

2. Node Editing/ Cofiguration Forms.
    * Editable node form panel for each node type.
    * Node edit forms for Start Node, Task Node, Approval Node, Automated Step Node, and End Node. Each form has required fields as mentioned in the assessment.

3. Mock API Layer
    * GET /automations
    * POST /simulate

4. Worflow Testing/ Sandbox Panel
    * A small modal for the purpose
    * Workflow graph serialization
    * Call to /simulte API
    * Display of step by step of execution log
    * Structure validation: cycle detecton, execution order determination

5. Bonus
    * Export workflow as json
    * zoom controls



### What I would have added with more time
Given the scope of the assessment, I would have added following things with more time:

1. Refactor the some more code to strictly enforce DRY.
2. Would add functionality to check missing connections.
3. Implement bonus features.
