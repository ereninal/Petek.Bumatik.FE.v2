import { ResponseModel } from "./response";

export interface MultiResponseModel<T> extends ResponseModel{
    data:T[]
}