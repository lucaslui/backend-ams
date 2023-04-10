import { staffLoginPath, userLoginPath } from './paths/auth'
import { addUnitPath, deleteUnitPath, editUnitPath, loadUnitsPath } from './paths/unit'
import { addUserPath, deleteUserPath, editUserPath, loadUsersPath } from './paths/user'
import { addStaffPath, deleteStaffPath, editStaffPath, loadStaffsPath } from './paths/staff'
import { addAssetPath, loadAssetsPath, editAssetPath, deleteAssetPath, loadAssetsByUnitIdPath, editAssetImagePath, loadAssetImageByIdPath } from './paths/asset'
import { addCompanyPath, loadCompaniesPath, loadCompanyByIdPath, editCompanyPath, deleteCompanyPath, addCompanyUserPath } from './paths/company'

import { authAccessTokenSchema, authCompanyIdSchema, loginSchema, staffAccountSchema, userAccountSchema } from './schemas/auth'
import { addUserSchema, editUserSchema, entityUserSchema, loadUsersSchema } from './schemas/user'
import { addStaffSchema, editStaffSchema, entityStaffSchema, loadStaffsSchema } from './schemas/staff'
import { addCompanySchema, addCompanyUserSchema, editCompanySchema, entityCompanySchema, loadCompaniesSchema } from './schemas/company'
import { addUnitSchema, editUnitSchema, entityUnitSchema, loadUnitsSchema } from './schemas/unit'
import { editAssetImageSchema, addAssetSchema, entityAssetSchema, editAssetSchema, loadAssetsSchema, loadAssetImageByIdSchema } from './schemas/asset'

import { badRequestComponent, unauthorizedComponent, noContentComponent, notFoundComponent, serverErrorComponent, forbiddenComponent } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Sistema de Gerenciamento de Ativos (AMS, asset management system)',
    description:
      'A responsabilidade dessa API é prover gerenciamento de ativos para nossos clientes em um esquema **Multi-tenant**, sendo assim o sistema é dividido em:\n\n' +
      ' - **Sistema Principal**: aquele fornecido para os clientes para que ele possa gerenciar **unidades, ativos e outros usuários**.\n' +
      ' - **Sistema Bastidor**: aquele utilizado por colaboradores da Tractian que irão dar suporte do sistema gerenciando **companhias e outros colaboradores**.\n',
    version: '1.0.0',
    license: {
      name: `© ${new Date().getFullYear()} Tractian. Todos os direitos reservados.`,
      url: 'https://tractian.com/'
    }
  },
  servers: [{
    url: '/v1',
    description: 'api versão 1.0.0'
  }],
  tags: [{
    name: 'Autenticação',
    description: 'APIS relacionadas a autenticação do usuário.'
  },{
    name: 'Usuários',
    description: 'APIs relacionadas ao gerenciamento de usuários'
  },{
    name: 'Colaboradores (Backoffice)',
    description: 'APIs relacionadas ao gerenciamento de usuários de suporte'
  },{
    name: 'Companhias (Backoffice)',
    description: 'APIs relacionadas ao gerenciamento de companhias'
  },{
    name: 'Unidades',
    description: 'APIs relacionadas ao gerenciamento de unidades da companhia'
  },{
    name: 'Ativos',
    description: 'APIs relacionadas ao gerenciamento de ativo de uma unidade e companhia'
  }],
  paths: {
    '/login/user': {
      post: userLoginPath
    },
    '/login/staff': {
      post: staffLoginPath
    },

    '/users': {
      post: addUserPath,
      get: loadUsersPath
    },
    '/users/{userId}': {
      put: editUserPath,
      delete: deleteUserPath
    },

    '/staffs': {
      post: addStaffPath,
      get: loadStaffsPath
    },
    '/staffs/{staffId}': {
      put: editStaffPath,
      delete: deleteStaffPath
    },

    '/companies': {
      post: addCompanyPath,
      get: loadCompaniesPath
    },
    '/companies/admin/{companyId}': {
      post: addCompanyUserPath
    },
    '/companies/{companyId}': {
      get: loadCompanyByIdPath,
      put: editCompanyPath,
      delete: deleteCompanyPath
    },

    '/units': {
      post: addUnitPath,
      get: loadUnitsPath
    },
    '/units/{unitId}': {
      put: editUnitPath,
      delete: deleteUnitPath
    },

    '/assets/{unitId}': {
      post: addAssetPath,
      get: loadAssetsByUnitIdPath
    },
    '/assets': {
      get: loadAssetsPath
    },
    '/assets/image/{imageId}': {
      get: loadAssetImageByIdPath
    },
    '/assets/image/{assetId}': {
      put: editAssetImagePath
    },
    '/assets/{assetId}': {
      put: editAssetPath,
      delete: deleteAssetPath
    }
  },
  schemas: {
    userAccountSchema,
    staffAccountSchema,

    loginSchema,

    entityUserSchema,
    addUserSchema,
    editUserSchema,
    loadUsersSchema,

    entityStaffSchema,
    addStaffSchema,
    editStaffSchema,
    loadStaffsSchema,

    entityCompanySchema,
    addCompanySchema,
    addCompanyUserSchema,
    editCompanySchema,
    loadCompaniesSchema,

    entityUnitSchema,
    addUnitSchema,
    editUnitSchema,
    loadUnitsSchema,

    entityAssetSchema,
    addAssetSchema,
    editAssetSchema,
    loadAssetsSchema,
    loadAssetImageByIdSchema,
    editAssetImageSchema
  },
  components: {
    badRequest: badRequestComponent,
    unauthorized: unauthorizedComponent,
    noContent: noContentComponent,
    notFound: notFoundComponent,
    serverError: serverErrorComponent,
    forbidden: forbiddenComponent,
    securitySchemes: {
      authAccessTokenSchema: authAccessTokenSchema,
      authCompanyIdSchema: authCompanyIdSchema
    },
    schemas: {
      Usuário: entityUserSchema,
      Colaborador: entityStaffSchema,
      Companhia: entityCompanySchema,
      Unidade: entityUnitSchema,
      Ativo: entityAssetSchema
    }
  }
}
