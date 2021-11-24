const { buildSchema } = require('graphql');

const projectSchema = buildSchema(`
    type Query {
        getAllProjects: [Project!]
    },
    type Mutation{
        createProject{
            id: Int
            startAt: DateTime
            endAt: DateTime
            name: String
            client: String
            description: String
            timing: String
            tasks: [Task!]
            documents: [Documents!]
            participants: [UserProject!]
        }
    },
    type Project{
        id: Int
        startAt: DateTime
        endAt: DateTime
        name: String
        client: String
        description: String
        timing: String
        tasks: [Task!]
        documents: [Documents!]
        participants: [UserProject!]
    }
`);

module.exports = { projectSchema };
