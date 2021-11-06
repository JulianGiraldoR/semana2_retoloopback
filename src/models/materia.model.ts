import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Materia extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadhoras: number;

  @property({
    type: 'string',
  })
  matriculaId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Materia>) {
    super(data);
  }
}

export interface MateriaRelations {
  // describe navigational properties here
}

export type MateriaWithRelations = Materia & MateriaRelations;
