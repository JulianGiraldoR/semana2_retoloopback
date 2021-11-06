import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Matricula, MatriculaRelations, Estudiante, Materia} from '../models';
import {EstudianteRepository} from './estudiante.repository';
import {MateriaRepository} from './materia.repository';

export class MatriculaRepository extends DefaultCrudRepository<
  Matricula,
  typeof Matricula.prototype.id,
  MatriculaRelations
> {

  public readonly estudiante: BelongsToAccessor<Estudiante, typeof Matricula.prototype.id>;

  public readonly materia: HasOneRepositoryFactory<Materia, typeof Matricula.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>,
  ) {
    super(Matricula, dataSource);
    this.materia = this.createHasOneRepositoryFactoryFor('materia', materiaRepositoryGetter);
    this.registerInclusionResolver('materia', this.materia.inclusionResolver);
    this.estudiante = this.createBelongsToAccessorFor('estudiante', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiante', this.estudiante.inclusionResolver);
  }
}
