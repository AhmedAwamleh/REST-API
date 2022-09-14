class userCommentRoutes {
    constructor(model) {
        this.model = model;
    }
    async create(obj) {
        try {
            return await this.model.create(obj);
        } catch (e) {
            console.error('Error creation');
        }
    }

    async read(id) {
        try {
            if (id) {
                return await this.model.findOne({ where: { id: id } });
            } else {
                return await this.model.findAll();
            }
        } catch (e) {
            console.error(`Error in reading `);
        }
    }

    async update(id, obj) {
        try {
            const dataById = await this.model.findOne({ where: { id } });
            return await dataById.update(obj);
        } catch (e) {
            console.error(`Error in updating`);
        }
    }

    async delete(id) {
        try {
            return await this.model.destroy({ where: { id } });
        } catch (e) {
            console.error(`Error in  deleting `);
        }
    }

    async readWithComments(Comment) {
        try {
            return await this.model.findAll({ include: [Comment] });
        } catch (e) {
            console.error(`Error`);
        }
    }

    async readOneWithComments(id, Comment) {
        try {
            return await this.model.findOne({ where: { id }, include: [Comment] });
        } catch (e) {
            console.error(`Error `);
        }
    }

}

module.exports = userCommentRoutes;