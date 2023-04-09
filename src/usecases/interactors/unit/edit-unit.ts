import { left, right } from '@/src/shared/either'
import { IEditUnit, EditUnitParams, EditUnitReturn } from '../../boundaries/input/unit/edit-unit'
import { IEditUnitRepository } from '../../boundaries/output/repositories/unit/edit-unit-repository'
import { ILoadUnitByIdRepository } from '../../boundaries/output/repositories/unit/load-unit-by-id-repository'
import { ILoadUnitByNameRepository } from '../../boundaries/output/repositories/unit/load-unit-by-name-repository'

export class EditUnit implements IEditUnit {
  constructor (
    private readonly unitsRepository: ILoadUnitByNameRepository & ILoadUnitByIdRepository & IEditUnitRepository
  ) {}

  async edit (params: EditUnitParams): Promise<EditUnitReturn> {
    const assetByName = await this.unitsRepository.loadByName({ companyId: params.companyId, name: params.name })

    if (assetByName) {
      if (assetByName?.id !== params.unitId) {
        return left(new Error('Unit name already in use'))
      }
    }

    const assetById = await this.unitsRepository.loadById({ unitId: params.unitId })

    if (!assetById) {
      return left(new Error('Unit not found'))
    }

    const unit = await this.unitsRepository.edit(params)

    return right(unit)
  }
}
