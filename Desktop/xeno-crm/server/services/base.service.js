/**
 * BaseService class provides basic CRUD operations for services
 */

export class BaseService {
  /**
   *
   * @param {import('mongoose').Model} model -> Mongoose model to be used
   */
  constructor(model) {
    this.model = model;
  }

  /**
   *
   * @param {Object} data
   * @returns {Promise<Object>} the created document
   * @description Creates a new document in the database
   */
  async create(data) {
    return await this.model.create(data);
  }

  /**
   *
   * @param {Object} [query={}] The query object
   * @returns {Promise<Array>} an array of documents
   * @description Finds documents in the database based on the query
   */
  async find(query = {}) {
    return await this.model.find(query);
  }

  /**
   *
   * @param {import("mongoose").Types.ObjectId} id - Mongodb id of the document to find
   * @returns {Promise<Object|null>}  the found document or null if not found
   * @description Finds a document by its ID
   */
  async findById(id) {
    return await this.model.findById(id);
  }

  /**
   *
   * @param {import("mongoose").Types.ObjectId} id - Mongodb id of the document to update
   * @param {Object} data - The data to update the document with
   * @returns {Promise<Object|null>} the updated document or null if not found
   * @description Updates a document by its ID
   */
  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   *
   * @param {import("mongoose").Types.ObjectId} id - mongodb id of the document to delete
   * @returns {Promise<Object|null>} the deleted document or null if not found
   * @description Deletes a document by its ID
   */
  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}
