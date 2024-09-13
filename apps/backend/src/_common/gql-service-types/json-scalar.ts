
import { Scalar, CustomScalar } from '@nestjs/graphql';
import {GraphQLJSON} from 'graphql-type-json';

@Scalar('JSON', type => Object)
export class JsonScalar implements CustomScalar<string, any> {
    name = GraphQLJSON.name;
    description = GraphQLJSON.description;

    serialize = GraphQLJSON.serialize as any;
    parseValue = GraphQLJSON.parseValue;
    parseLiteral = GraphQLJSON.parseLiteral;
}