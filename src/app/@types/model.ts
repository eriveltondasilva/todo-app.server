/**
 * @interface IModel
 * @desc Interface for Model
 **/
export interface IModel {
  findAll(data?: number[]): Promise<any[]>
  findById(id: number): Promise<any>
  create<T>(data: T): Promise<any>
  update<T>(id: number, data: T): Promise<any>
  deleteById(id: number): Promise<void>
  destroyManyById(data?: number[]): Promise<void>
}
