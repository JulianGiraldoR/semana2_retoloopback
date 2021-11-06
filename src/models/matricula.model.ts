import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Estudiante} from './estudiante.model';

@model()
export class Matricula extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  grado: string;

  @property({
    type: 'string',
    required: true,
  })
  estadomatricula: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadmaterias: number;

  @belongsTo(() => Estudiante)
  estudianteId: string;

  constructor(data?: Partial<Matricula>) {
    super(data);
  }
}

export interface MatriculaRelations {
  // describe navigational properties here
}

export type MatriculaWithRelations = Matricula & MatriculaRelations;
