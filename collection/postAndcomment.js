'use strict'

class postAndcomment {
    constructor(model) {
        this.model = model;

    }
    async create(opj) {
        try {
            return await this.model.create(opj)

        } catch (e) {
            console.error('error during creation')
        }
    }
    async read(id) {
        try {
            if (id) {
                return await this.model.findOne({ where: { id } })
            } else {
                return await this.model.findAll();
            }
        } catch (e) {
            console.error(`error in reading data with id:${id}`)
        }
    }
    async update(id, opj) {
        try {
            const dataById = this.model.findOne({ where: { id } })
            return await dataById.update(opj)
        } catch (e) {
            console.error(`error whiel updating data with id${id}`)
        }
    }
    async delete(id) {
        try {
            return await this.model.destroy({ where: { id: id } })

        } catch (e) {
            console.error(`error whiel Deletig data with id${id}`)

        }

    }
    async readWithComment(Comment) {
        try {
            return await this.model.findAll(
                { include: Comment }
            )

        } catch (e) {
            console.error(`error geting Alldata`)
        }
    }
}
module.exports = postAndcomment;