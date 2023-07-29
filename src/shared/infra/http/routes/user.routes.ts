import { Segments, celebrate } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import { AuthorizeUserController } from "modules/users/useCases/authorizeUser/AuthorizeUserController";
import { CreateUserController } from "modules/users/useCases/createUser/CreateUserController";
import { DeleteUserController } from "modules/users/useCases/deleteUser/DeleteUserController";
import { FindUserByIdController } from "modules/users/useCases/findUserById/FindUserByIdController";
import { FindUserController } from "modules/users/useCases/findUsers/FindUserController";
import { UpdateUserController } from "modules/users/useCases/updateUser/UpdateUserController";

const userRoutes = Router();
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const findByIdController = new FindUserByIdController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const authorizeUserController = new AuthorizeUserController();

userRoutes.get("/:id", findByIdController.handle);

userRoutes.get("/", findUserController.handle);

userRoutes.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().messages({
        "string.base": `"email" deve ser uma string`,
        "string.empty": `"email" não pode ser um campo vazio`,
        "any.required": `"email" é um campo requerido`,
      }),
      password: Joi.string().required().messages({
        "string.base": `"password" deve ser uma string`,
        "string.empty": `"password" não pode ser um campo vazio`,
        "any.required": `"password" é um campo requerido`,
      }),
    },
  }),
  authorizeUserController.handle
);

userRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().messages({
        "string.base": `"name" deve ser uma string`,
        "string.empty": `"name" não pode ser um campo vazio`,
        "any.required": `"name" é um campo requerido`,
      }),
      email: Joi.string().required().messages({
        "string.base": `"email" deve ser uma string`,
        "string.empty": `"email" não pode ser um campo vazio`,
        "any.required": `"email" é um campo requerido`,
      }),
      password: Joi.string().required().messages({
        "string.base": `"password" deve ser uma string`,
        "string.empty": `"password" não pode ser um campo vazio`,
        "any.required": `"password" é um campo requerido`,
      }),
      confirmPassword: Joi.string().required().messages({
        "string.base": `"confirmPassword" deve ser uma string`,
        "string.empty": `"confirmPassword" não pode ser um campo vazio`,
        "any.required": `"confirmPassword" é um campo requerido`,
      }),
      company: Joi.string().messages({
        "string.base": `"company" deve ser uma string`,
      }),
      documents: Joi.string().messages({
        "string.base": `"documents" deve ser uma string`,
      }),
      birthDate: Joi.string().messages({
        "string.base": `"birthDate" deve ser uma string`,
      }),
      phoneNumber: Joi.string().messages({
        "string.base": `"phoneNumber" deve ser uma string`,
      }),
    },
  }),
  createUserController.handle
);

userRoutes.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().messages({
        "string.base": `"name" deve ser uma string`,
      }),
      email: Joi.string().messages({
        "string.base": `"email" deve ser uma string`,
      }),
      company: Joi.string().messages({
        "string.base": `"company" deve ser uma string`,
      }),
      documents: Joi.string().messages({
        "string.base": `"documents" deve ser uma string`,
      }),
      birthDate: Joi.string().messages({
        "string.base": `"birthDate" deve ser uma string`,
      }),
      phoneNumber: Joi.string().messages({
        "string.base": `"phoneNumber" deve ser uma string`,
      }),
    },
  }),
  updateUserController.handle
);

userRoutes.delete("/:id", deleteUserController.handle);

export { userRoutes };
