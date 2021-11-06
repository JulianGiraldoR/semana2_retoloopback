import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Estudiante} from './estudiante.model';
import {Materia} from './materia.model';

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
  materia_id: number;

  @belongsTo(() => Estudiante)
  estudianteId: string;

  @hasOne(() => Materia)
  materia: Materia;

  constructor(data?: Partial<Matricula>) {
    super(data);
  }
}

export interface MatriculaRelations {
  // describe navigational properties here
}

export type MatriculaWithRelations = Matricula & MatriculaRelations;
