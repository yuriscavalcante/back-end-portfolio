import { Router } from "express";
import { CreateCompanyController } from "modules/companies/useCases/createCompany/CreateCompanyController";
import { DeleteCompanyController } from "modules/companies/useCases/deleteCompany/DeleteCompanyController";
import { FindCompaniesController } from "modules/companies/useCases/findCompanies/findCompaniesController";
import { FindCompanyByIdController } from "modules/companies/useCases/findCompanyById/FindCompanyByIdController";
import { UpdateCompanyController } from "modules/companies/useCases/updateCompany/UpdateCompanyController";
import { Segments, celebrate } from "celebrate";
import Joi from "joi";

const companiesRoutes = Router();
const createCompanyController = new CreateCompanyController();
const deleteCompanyController = new DeleteCompanyController();
const findCompanyByIdController = new FindCompanyByIdController();
const findCompaniesController = new FindCompaniesController();
const updateCompanyController = new UpdateCompanyController();

companiesRoutes.get("/:id", findCompanyByIdController.handle);

companiesRoutes.get("/", findCompaniesController.handle);

companiesRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().messages({
        "string.base": `"name" deve ser uma string`,
        "string.empty": `"name" não pode ser um campo vazio`,
        "any.required": `"name" é um campo requerido`,
      }),
      cnpj: Joi.string().required().messages({
        "string.base": `"cnpj" deve ser uma string`,
        "string.empty": `"cnpj" não pode ser um campo vazio`,
        "any.required": `"cnpj" é um campo requerido`,
      }),
      email: Joi.string().messages({
        "string.base": `"email" deve ser uma string`,
      }),
      phoneNumber: Joi.string().messages({
        "string.base": `"phoneNumber" deve ser uma string`,
      }),
      acronym: Joi.string().messages({
        "string.base": `"acronym" deve ser uma string`,
      }),
    },
  }),
  createCompanyController.handle
);

companiesRoutes.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().messages({
        "string.base": `"name" deve ser uma string`,
      }),
      cnpj: Joi.string().messages({
        "string.base": `"cnpj" deve ser uma string`,
      }),
      email: Joi.string().messages({
        "string.base": `"email" deve ser uma string`,
      }),
      phoneNumber: Joi.string().messages({
        "string.base": `"phoneNumber" deve ser uma string`,
      }),
      acronym: Joi.string().messages({
        "string.base": `"acronym" deve ser uma string`,
      }),
    },
  }),
  updateCompanyController.handle
);

companiesRoutes.delete("/:id", deleteCompanyController.handle);

export { companiesRoutes };
