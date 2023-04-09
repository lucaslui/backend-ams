import { left, right } from '@/src/shared/either'
import { IAddUnit, AddUnitParams, AddUnitReturn } from '../../boundaries/input/unit/add-unit'
import { IAddUnitRepository } from '../../boundaries/output/repositories/unit/add-unit-repository'
import { ILoadUnitByNameRepository } from '../../boundaries/output/repositories/unit/load-unit-by-name-repository'

export class AddUnit implements IAddUnit {
  constructor (
    private readonly unitsRepository: ILoadUnitByNameRepository & IAddUnitRepository
  ) {}

  async add (params: AddUnitParams): Promise<AddUnitReturn> {
    const isNameAlreadyUsed = await this.unitsRepository.loadByName({ companyId: params.companyId, name: params.name })

    if (isNameAlreadyUsed) {
      return left(new Error('Unit name already in use'))
    }

    const unit = await this.unitsRepository.add(params)

    return right(unit)
  }
}
